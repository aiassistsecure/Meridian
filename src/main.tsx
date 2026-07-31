import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MeridianClient } from './MeridianClient'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><MeridianClient /></StrictMode>,
)
