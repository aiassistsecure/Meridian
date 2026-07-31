import { useState } from 'react'
import { Composer } from './components/Composer'
import { ConversationHeader } from './components/ConversationHeader'
import { RoomInspector } from './components/RoomInspector'
import { RoomRail } from './components/RoomRail'
import { Timeline } from './components/Timeline'
import { initialMessages, rooms } from './data'
import type { Message } from './types'

export function MeridianClient() { const [roomId, setRoomId] = useState('signal'); const [downloadAll, setDownloadAll] = useState(false); const [messages, setMessages] = useState<Message[]>(initialMessages); const room = rooms.find(({ id }) => id === roomId)!; function send(text: string) { setMessages((current) => [...current, { id: crypto.randomUUID(), author: 'you', initials: 'ME', time: 'now', text }]) } return <main className="meridian-shell"><RoomRail rooms={rooms} selected={roomId} onSelect={setRoomId} /><section className="conversation"><ConversationHeader room={room} /><Timeline messages={messages} /><Composer onSend={send} /></section><RoomInspector peers={room.peers} downloadAll={downloadAll} onToggle={() => setDownloadAll((value) => !value)} /></main> }
