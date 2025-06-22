import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthContext } from '~contexts/auth-context'

export interface UseSocketReturn {
  socket: Socket | null
  joinProduct: (productId: string) => void
  leaveProduct: (productId: string) => void
  sendMessage: (productId: string, content: string) => void
  markRead: (messageId: string, productId: string) => void
}

export const useSocket = (): UseSocketReturn => {
  const { access_token } = useAuthContext()
  const socketRef = useRef<Socket | null>(null)
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

  useEffect(() => {
    if (!access_token) return

    const socket = io(SOCKET_URL, {
      autoConnect: false,
      auth: { token: `Bearer ${access_token}` }
    })
    socketRef.current = socket

    socket.connect()

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [access_token, SOCKET_URL])

  const joinProduct = (productId: string) => {
    socketRef.current?.emit('join_product', productId)
  }

  const leaveProduct = (productId: string) => {
    socketRef.current?.emit('leave_product', productId)
  }

  const sendMessage = (productId: string, content: string) => {
    socketRef.current?.emit('send_message', { productId, content })
  }

  const markRead = (messageId: string, productId: string) => {
    socketRef.current?.emit('message_read', { messageId, productId })
  }

  return {
    socket: socketRef.current,
    joinProduct,
    leaveProduct,
    sendMessage,
    markRead
  }
}
