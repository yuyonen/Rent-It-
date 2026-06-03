import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { messagesAPI } from '../services/api'

interface Message {
  id: number
  sender_id: number
  receiver_id: number
  sender_username: string
  content: string
  is_read: boolean
  created_at: string
}

export default function MessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    try {
      const response = await messagesAPI.getAll()
      setMessages(response.data)
    } catch (err) {
      console.error('Error loading messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const groupedMessages = messages.reduce((acc, msg) => {
    const otherUserId = msg.sender_id === user?.id ? msg.receiver_id : msg.sender_id
    if (!acc[otherUserId]) {
      acc[otherUserId] = []
    }
    acc[otherUserId].push(msg)
    return acc
  }, {} as Record<number, Message[]>)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8">Viestit</h2>

      {loading ? (
        <div className="text-center text-gray-600">Ladataan...</div>
      ) : Object.keys(groupedMessages).length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">Sinulla ei ole vielä viestejä</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                {Object.entries(groupedMessages).map(([userId, msgs]) => {
                  const latestMsg = msgs[msgs.length - 1]
                  const unreadCount = msgs.filter((m) => !m.is_read && m.receiver_id === user?.id).length

                  return (
                    <button
                      key={userId}
                      onClick={() => setSelectedConversation(parseInt(userId))}
                      className={`w-full text-left p-4 hover:bg-blue-50 transition ${
                        selectedConversation === parseInt(userId) ? 'bg-blue-100' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-800">{latestMsg.sender_username}</p>
                        {unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm truncate">{latestMsg.content}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(latestMsg.created_at).toLocaleDateString()}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedConversation ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6">Viestit</h3>
                <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
                  {groupedMessages[selectedConversation]?.map((msg) => (
                    <div key={msg.id} className={`mb-4 ${
                      msg.sender_id === user?.id ? 'text-right' : ''
                    }`}>
                      <div
                        className={`inline-block max-w-xs rounded-lg p-3 ${
                          msg.sender_id === user?.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kirjoita viesti..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Lähetä
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">Valitse keskustelu nähdäksesi viestit</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}