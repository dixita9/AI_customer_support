import OpenAI from "openai";
import {NextResponse} from 'next/server'

export async function POST(req){
    // const openai = new OpenAI();
    // const completion = await openai.chat.completions.create({
    //     messages: [{"role": "system", "content": "You are a helpful assistant."},
    //         {"role": "user", "content": "Who won the world series in 2020?"},
    //         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    //         {"role": "user", "content": "Where was it played?"}],
    //     model: "gpt-4o-mini",
    //   });
    
    //   console.log(completion.choices[0]);
      return NextResponse.json({message:'Hello from the server'})
    
}




async function main() {
 
}
main();