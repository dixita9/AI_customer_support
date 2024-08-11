import { NextResponse } from 'next/server';
// const { ChromaClient } = require("chromadb");
// console.log("hello from database")
// const client = new ChromaClient();

// const collection = await client.createCollection({
//     name: "my_collection",
// });

// await collection.add({
//     documents: [
//         "This is a document about pineapple",
//         "This is a document about oranges"
//     ],
//     ids: ["id1", "id2"],
// });

// const results = await collection.query({
//     queryTexts: ["This is a query document about hawaii"], // Chroma will embed this for you
//     nResults: 2, // how many results to return
// });

// console.log(results)

export async function GET(req){
    return NextResponse.json(
        {message: "Hello from the database!"}
    )
}

