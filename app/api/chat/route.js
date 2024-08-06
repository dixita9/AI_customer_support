import {NextResponse} from 'next/server'

var message_history = []
export async function POST(req){

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
    const message = (await req.json()).message
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-8b-instruct:free",
          "messages": [
            {"role": "user", "content": `${message}`},
          ],
        })
      });
      const output = (await response.json()).choices[0].message
      console.log(output)
      return NextResponse.json({message: output})
    
}




async function main() {
 
}
main();