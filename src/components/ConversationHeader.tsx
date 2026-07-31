import { Info, Radio, Settings2 } from 'lucide-react'
import type { Room } from '../types'
export function ConversationHeader({ room }: { room: Room }) {
  return <><header className="conversation-header"><div><div className="room-title"><Radio /><span>{room.label}</span></div><div className="room-meta">{room.peers} {room.peers === 1 ? 'peer' : 'peers'} · encrypted · local-first</div></div><div className="header-actions"><button aria-label="View room information"><Info /></button><button aria-label="Open room settings"><Settings2 /></button></div></header><div className="session-divider">SESSION 014 · 00:00–12:00 UTC</div></>
}
