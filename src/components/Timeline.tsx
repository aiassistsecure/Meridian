import { Avatar } from './Avatar'
import type { Message } from '../types'
export function Timeline({ messages }: { messages: Message[] }) { return <div className="timeline" aria-live="polite">{messages.map((message, index) => <MessageRow key={message.id} message={message} after={index === 2} />)}</div> }
function MessageRow({ message, after }: { message: Message; after: boolean }) { return <><article className="message"><Avatar initials={message.initials} /><div><div className="message-meta"><span>{message.author}</span><time>{message.time}</time></div><p>{message.text}</p></div></article>{after && <div className="merge-note">3 concurrent objects merged by causal order · <span>frontier 8f2a…c91e</span></div>}</> }
