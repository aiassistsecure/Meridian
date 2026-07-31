import type { Message, Room } from './types'

export const rooms: Room[] = [
  { id: 'signal', label: 'signal', icon: 'signal', peers: 4, unread: 4 },
  { id: 'the-build', label: 'the-build', icon: 'build', peers: 2, unread: 2 },
  { id: 'after-hours', label: 'after-hours', icon: 'after-hours', peers: 1 },
  { id: 'archive', label: 'archive', icon: 'archive', peers: 1 },
]

export const initialMessages: Message[] = [
  { id: '1', author: 'vex', initials: 'VX', time: '09:42', text: 'We are not building another place where the conversation belongs to the company.' },
  { id: '2', author: 'you', initials: 'ME', time: '09:44', text: 'Right. Everyone keeps their own copy. Shared truth, no landlord.' },
  { id: '3', author: 'nova', initials: 'NV', time: '09:45', text: 'The room opens in the present by default. History is a choice, not a surprise download.' },
  { id: '4', author: 'you', initials: 'ME', time: '09:47', text: 'And we keep full data for 24 hours, then the receipt carries the proof forward.' },
]
