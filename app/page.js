"use client"
import { Button, Box, Stack, TextField} from "@mui/material";
import {useState} from "react"

export default function Home() {
  const [messages, setMessages] = useState([
    {role: 'assistant' , content : `Hi! I'm the Headstarter support assistant. How can I help you today?`}
  ])
  return (
    <Box width = "100vh"
        height = "100vh"
        display = "flex"
        flexDirection = "column"
        justifyContent = "flex-end"
    >  
    <Stack>

      <Stack>
        <Stack direction = {"row"} spacing = {2}>
          <TextField label = "Message" fullWidth />
          <Button variant = "contained">Send</Button>
        </Stack>
      </Stack>
    </Stack>
    </Box>
  );
}
