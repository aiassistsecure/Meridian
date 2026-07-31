export type Room = { id: string; label: string; icon: 'signal' | 'build' | 'after-hours' | 'archive'; peers: number; unread?: number }
export type Message = { id: string; author: string; initials: string; time: string; text: string }
