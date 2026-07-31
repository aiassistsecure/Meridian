# MERIDIAN Protocol Foundation

**Version:** 1.0.0-draft  
**Status:** Foundation  
**Date:** 2026-07-31

## 1. Core model

MERIDIAN is peer-to-peer, multi-writer, and local-first. Every participant
holds an independent embedded NEDB replica. A peer creates an object locally,
signs it, commits it durably, and then gossips it to other peers.

No peer is a canonical writer. No peer assigns a global sequence. Concurrent
writes are valid.

The canonical room history is a signed causal DAG. An entry refers to the
causal parents known to its author. Clients derive a stable *display order*
only after causal ordering, using Lamport clock and entry id as deterministic
tie-breakers. That display order never changes the DAG or makes one peer
authoritative.

## 2. Pruning is the default

MERIDIAN is not a permanent archive by accident. Every conforming client MUST
enable the **Default Retention Profile** for every newly created or joined
room, unless the user explicitly selects another profile.

The default profile uses a rolling content window. The shared 12-hour session
rhythm remains the cadence for checkpoints and display, but it MUST NOT shorten
the lifetime of a full entry.

| Data | Default retention | Result after expiry |
|---|---:|---|
| Full entry envelope, sealed body, and attachments | 24 hours from local durable acceptance | Pruned locally into a receipt |
| Compact receipt | 30 days | Available for integrity checks and anti-entropy |
| Session checkpoint | Indefinitely | Small, verifiable continuity record |

The retention timer is derived from local durable acceptance, never an
author-supplied timestamp or a peer's clock claim. At the next local
maintenance run after the 24-hour deadline, the client MUST prune the full
entry envelope, body, attachments, previews, and body-derived indexes. A
client MAY run maintenance early only after the deadline; it MUST NOT retain
full content beyond the selected profile merely because it has disk space.

Pruning is local and irreversible. It does not retract copies already held by
other peers and MUST NOT be presented as network-wide deletion.

## 3. Bootstrap into the present

MERIDIAN does not make a newly installed peer download everybody else's past.
The default join behavior is **present-first**: a peer downloads enough public
protocol material to participate now, then receives new room history from the
point it joins.

On first connection, a client MUST download the current **network template**
and the room descriptors it is permitted to see. For each room it joins, it
MUST download the current room template/state checkpoint needed to validate
membership, privileges, closure, and the current DAG frontier. It MUST then
subscribe to new valid entries for that room.

By default, it MUST NOT request or receive the room's full historical bodies.
Old receipts and checkpoints MAY be provided when required to prove the room's
current state, but they are not a conversation backfill.

```text
default entry:
  network template + visible rooms + current room state + live future entries

not downloaded by default:
  prior message bodies + historical attachments + complete room transcript
```

### 3.1 `downloadAllOnEntry`

Every room join request has an explicit boolean:

```text
downloadAllOnEntry: false   // REQUIRED default
```

When `false`, the peer joins at the room's current verified frontier and
receives only entries accepted after its join cursor. When `true`, the peer
MAY request every historical object that a responding peer still retains.

`downloadAllOnEntry: true` is a best-effort content request, not a promise.
Pruning means no peer may still possess some or all historical bodies. For
every unavailable requested object, a responding peer MUST return `PRUNED`
with a receipt or a covering checkpoint. The client MUST show historical
coverage as **available**, **pruned**, or **unknown**; it MUST NOT imply a
complete transcript merely because a sync completed.

### 3.2 Template versus history

The network template is compact, versioned public protocol material: schema
versions, supported capabilities, discovery policy, and the visible room
directory. A room template is compact state necessary to enter a room safely:
room id, visibility, admission policy, current member/privilege state root,
retention profile, current checkpoint, and DAG frontier.

Templates are not message history. They MUST NOT embed historical message
bodies, attachments, previews, or body-derived search indexes.

### 3.3 The receipt

Before removing a full entry, a peer MUST retain a compact receipt with enough
material to verify the entry's identity and causal placement without retaining
its sealed body:

```text
Receipt {
  entry_id: Hash,
  room_id: RoomId,
  author_key: PublicKey,
  parents: [Hash],
  lamport: u64,
  session_index: u64,
  kind: u8,
  body_commitment: Hash,
  signature: Bytes,
  pruned_at: u64
}
```

`entry_id` MUST commit to every signed header field and `body_commitment`.
The signed preimage MUST use `body_commitment`, never raw body bytes. This is
what makes later body removal possible without breaking entry-id or signature
verification.

Receipts MUST NOT contain message plaintext, sealed body bytes, attachment
bytes, decrypted previews, or search indexes derived from body content.

### 3.4 Checkpoints

At the close of every 12-hour room session, a peer that possesses the session's
known objects MAY produce a **session checkpoint**. A checkpoint contains:

```text
Checkpoint {
  room_id: RoomId,
  session_index: u64,
  included_root: Hash,
  frontier: [Hash],
  state_root: Hash,
  author_key: PublicKey,
  signature: Bytes
}
```

`included_root` is a deterministic Merkle root over the entry ids in that
room/session. `frontier` is the sorted set of DAG heads after applying those
entries. `state_root` commits to the derived room membership and privilege
state.

Checkpoints are attestations, not leaders. Different honest peers may publish
different checkpoints while they have seen different valid subsets. Once they
have the same valid objects, they MUST derive the same checkpoint bytes.

After a receipt reaches 30 days, a client MAY remove it only when a locally
verified checkpoint covers the entry and the entry is not required by the
frontier of any retained checkpoint. This keeps storage bounded while retaining
an auditable chain of session commitments.

### 3.5 Sync after pruning

Gossip is object-based, not cursor-based. A peer advertises its known entry
ids, receipts, checkpoints, and retention horizon. Another peer MAY request a
missing full entry only when the advertising peer still retains it.

If a requested entry has been pruned, the peer MUST return `PRUNED` together
with its receipt or the covering checkpoint—not an empty success response.
The receiver MAY obtain the content from another peer, but MUST treat content
availability as best-effort. A receipt or checkpoint proves continuity; it does
not reconstruct a message body.

### 3.6 Product behavior

New rooms MUST visibly state: **“Full message content is kept on this device
for 24 hours by default.”** The room settings MAY offer longer retention or
manual export, but these are deliberate opt-ins. A user selecting a longer
profile changes only their own replica unless every room participant separately
chooses the same profile.

## 4. Acceptance criteria for pruning and entry sync

1. A fresh room defaults to the Default Retention Profile without a setup step.
2. At the first maintenance run after expiry, full body, attachment, preview,
   and body-derived index data are absent from local NEDB.
3. The corresponding receipt still verifies the entry id, author signature,
   parent references, and body commitment.
4. A pruned entry request returns `PRUNED` plus proof material, never an empty
   result that could be mistaken for “it never existed.”
5. Two peers with the same set of valid session entries derive byte-identical
   checkpoints.
6. A client cannot claim that pruning deleted another peer's copy.
7. A default room entry downloads templates/current verified state and starts
   receiving future entries, without requesting historical bodies.
8. `downloadAllOnEntry` defaults to `false`; setting it to `true` is an
   explicit, best-effort historical content request.
9. A historical sync distinguishes content that is available, pruned, and
   unknown.
