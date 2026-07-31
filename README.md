# MERIDIAN

> You found this because we wanted you to.

Something is moving.

You are reading this because you are interested in something new. That is the
signal we are blaring.

MERIDIAN is not another platform asking you to hand over your conversations.
It is a peer-to-peer meeting space where every person keeps their own copy of
what happened—and where shared history is made from objects everyone can verify.

No feed to optimize. No company-owned archive. No host that gets to rewrite the
room after the fact.

This is the beginning of a different default.

## The idea

Every participant has an embedded **NEDB** database. When you speak, your
client writes locally first, signs the record, then shares it directly with
peers. Their clients verify that record and store their own durable replica.

There is no central database to ask permission from, no canonical writer, and
no single owner of the room's memory.

MERIDIAN is a multi-writer, local-first, peer-to-peer protocol for spaces that
need a shared record without surrendering custody of it.

```text
you write locally → sign it → share it → peers verify it → everyone keeps theirs
```

## What makes it different

- **Your copy is real.** Data lives in your embedded replica, not only behind a
  product account.
- **Anyone can write.** Concurrent entries are normal; no leader assigns the
  next place in line.
- **History is verifiable.** Entries form a signed, hash-linked causal DAG.
  A changed object, missing parent, or forged author does not quietly blend in.
- **Order is honest.** Causality comes first. When two valid things happen at
  once, clients use a deterministic display order without pretending one person
  owned time.
- **The rhythm is shared.** The protocol recognizes 12-hour sessions, derived
  from UTC—not handed down by a scheduler.
- **Memory is bounded by default.** Full sealed entries automatically age out
  after 24 hours. Compact, verifiable receipts keep the graph
  honest without making every peer an accidental permanent archive.
- **Privacy belongs at the edge.** Message bodies are client-sealed; routing and
  storage peers handle ciphertext, not the conversation itself.

## What it is not

MERIDIAN is not surveillance software with a decentralization sticker. It does
not promise that the internet forgets, conceal metadata, or turn public keys
into magic.

Copies can persist. Network observers can still see timing and traffic shape.
That is why the protocol is designed to make ownership, verification, and
encryption explicit instead of hiding tradeoffs behind a friendly interface.

## The signal

We think the next generation of shared software will feel less like renting a
room from a platform and more like carrying a piece of the room with you.

If that sentence made you stop scrolling, you are already part of the signal.

MERIDIAN is being built in public. Read the protocol. Challenge the assumptions.
Run a peer. Keep a copy.

The room belongs to the people in it.

---

**Protocol thesis:** peer-to-peer · multi-writer · local-first · signed ·
client-sealed · pruning-by-default · NEDB-backed

## Run the client

```bash
npm install
npm run dev
```

The first public client is intentionally thin and componentized. It is the
product shell for the protocol: a room rail, conversation timeline, local-first
composer, and an inspector that makes retention and history choice visible.

## License

Meridian is released under the [Business Source License 1.1](LICENSE), with a
GPLv3+ change license on **2030-07-31**. The source stays visible now; each
release becomes GPLv3+ no later than four years after first public release.
