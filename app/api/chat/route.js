import {NextResponse} from 'next/server'
import systemPrompt from './systemPrompt';

/*
messages := list of messages
message := a dictionary with two keys, 'role' (who said it) and 'content' (what they said)
[
    {'role': 'user', 'content': 'How are you?'},
    {'role': 'assistant', 'content': 'I am well, how are you?'}
]
There are three possible roles:
1. 'user'
2. 'assistant'
3. 'system'
*/


//TODO: implement message history
//var message_history = []



export async function POST(req){
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
    const conversationList = await req.json()
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'model': 'meta-llama/llama-3.1-8b-instruct:free',
          'messages': [
            {'role': 'system', 'content': systemPrompt}, ...conversationList],
        })
      });

      const responseJSON = await response.json()
      const choices = responseJSON.choices
      if (choices === undefined) {
        throw new Error('We probably hit our rate limit for today ＞﹏＜ \nchoices is undefined')
      }
      const output = choices[0].message.content

      return NextResponse.json(
        {'message': output},
        {status: '200'}
      )
    
}
