"use client"
import { Button, Box, Stack, TextField} from "@mui/material";
import {useState, useEffect, useRef} from "react"

export default function Home() {
  const [messages, setMessages] = useState([
    {role: 'assistant' , content : `Hi! I'm the Headstarter support assistant. How can I help you today?`}
  ])

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage() {
    if (!message.trim() || isLoading) return;  // Don't send empty messages
    setIsLoading(true)

    setMessage('')
    setMessages(
      [
        ...messages,
        {'role': 'user', 'content': message},
        {'role': 'assistant', 'content': ''} // Placeholder
      ]
    )
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    
      const responseJSON = await response.json()
      console.log(responseJSON)
      const output = responseJSON.message

      setMessages(
        [
          ...messages,
          {'role': 'user', 'content': message},
          {'role': 'assistant', 'content': output} 
        ]
      )

     
    } catch (error){
      console.error('Error:', error)
      setMessages([
        ...messages,
        {'role': 'user', 'content': message},
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
      
    } finally {
      setIsLoading(false)
    }
    
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  
  return (
    <Box width = "100vh"
        height = "100vh"
        display = "flex"
        flexDirection = "column"
        justifyContent = "center"
        alignItems = "center"
    >  
      <Stack
          direction={'column'}
          width="500px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
      >

        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          justifyContent="flex-end"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"  
              justifyContent={
                message.role === "assistant"? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor = {
                  message.role === "assistant"
                  ? 'primary.main'
                  : 'secondary.main'
                }
                color = 'white'
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction = {"row"} spacing = {2}>
          <TextField 
            label = "Message"
            value = {message}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <Button variant = "contained" onClick={sendMessage} disabled={isLoading}>{isLoading ? 'Sending...' : 'Send'}</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
