import { Archive, Braces, Moon, Radio } from 'lucide-react'
import { Brand } from './Brand'
import { Avatar } from './Avatar'
import type { Room } from '../types'

const icons = { signal: Radio, build: Braces, 'after-hours': Moon, archive: Archive }
export function RoomRail({ rooms, selected, onSelect }: { rooms: Room[]; selected: string; onSelect: (id: string) => void }) {
  return <aside className="room-rail" aria-label="Rooms"><Brand /><p className="eyebrow">Your rooms</p><div className="room-list" role="listbox">
    {rooms.map((room) => { const Icon = icons[room.icon]; return <button className="room-button" type="button" role="option" aria-selected={room.id === selected} onClick={() => onSelect(room.id)} key={room.id}><Icon /><span>{room.label}</span>{room.unread ? <span className="room-count">{room.unread}</span> : null}</button> })}
  </div><div className="identity"><Avatar initials="ME" /><div><div className="identity-name">you / local peer</div><div className="identity-state">replica verified</div></div></div></aside>
}
