import express from 'express'
import { config } from 'dotenv'
import { MongoClient } from 'mongodb'
import bodyparser from 'body-parser'
import cors from 'cors'

config()

// const express=require('express')
// const dotenv = require('dotenv')
// const {MongoClient}=require('mongodb')
// const bodyparser=require('body-parser')
// const cors=require('cors')

// dotenv.config()

// const url=process.env.MONGO_URI;
const url = 'mongodb://localhost:27017'
const client=new MongoClient(url);
client.connect();

const dbName='passop';
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

// Get pwd
app.get('/', async (req, res) => {
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save pwd
app.post('/', async (req, res) => {
    const password = req.body
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult})
})

// Delete pwd
app.delete('/', async (req, res) => {
    const password = req.body
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
