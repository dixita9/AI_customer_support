import { NextResponse } from 'next/server';
const { ChromaClient } = require("chromadb");
console.log("hello from database")
const client = new ChromaClient();

await client.reset() 

console.log("passed the reset")

const collection = await client.createCollection({
    name: "my_collection",
});

console.log("Created a collection")

await collection.add({
    documents: [
        "This is a document about pineapple",
        "This is a document about oranges"
    ],
    ids: ["id1", "id2"],
});

console.log("Created some documents")

const results = await collection.query({
    queryTexts: ["This is a query document about hawaii"], // Chroma will embed this for you
    nResults: 2, // how many results to return
});

console.log("Gathered the results! Here they are:")

console.log(results)

export async function GET(req){
    return NextResponse.json(
        {message: "Hello from the database!"}
    )
}

