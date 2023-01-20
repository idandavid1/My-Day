import { eventBus, showModal, showModalDetails } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from "../services/socket.service.js"

export function UserMsg() {

  console.log('show modal')
  const [modal, setModal] = useState(null)
  // const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-modal', (msg) => {
      setModal(modal)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // if (timeoutIdRef.current) {
      //   timeoutIdRef.current = null
      //   clearTimeout(timeoutIdRef.current)
      // }
      // timeoutIdRef.current = setTimeout(closeMsg, 3000)

      // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showModalDetails(`New review about me`)

      return () => {
        unsubscribe()
        socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
      }
    }, [])
  })

  function closeModal() {
    setModal(null)
  }

  if (!modal) return <span></span>
  return (
    <section className="board-modal open">
      <button onClick={closeModal}>x</button>
      hello from board modal
    </section>
    // <section className={`user-msg ${msg.type}`}>
    //   {msg.txt}
    // </section>
  )
}