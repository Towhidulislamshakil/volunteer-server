const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sywml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("fashion").collection("events");
  const selectedEvent = client.db("fashion").collection("events");
  // console.log("connected")
  app.post('/addEvents', (req, res) =>{
    const event = req.body;
    // console.log(event);
    
    eventCollection.insertMany(event)
    .then(result =>{
      res.send(result.insertedCount > 0);
    })
  })

  app.get('/showEvents', (req, res) => {
    eventCollection.find({})
    .toArray((err, document) => {
        res.send(document);
    })
  })

  app.post('/selectEvent', (req, res) => {
    const event = req.body;
    selectedEvent.insertOne(event)
    .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount > 0);
    })
  })

  app.get('/userSelectEvent', (req, res)=>{
    // console.log(req.query.email);
    selectedEvent.find({email : req.query.email})
    .toArray((err, document) => {
        res.send(document);
    })
  })

  app.get('/volunteer', (req, res)=>{
    selectedEvent.find({})
    .toArray((err, document) => {
        res.send(document);
    })
  })

  app.delete("/removeEvent/:id", (req, res) => {
    console.log(req.params.id)
    selectedEvent.deleteOne({_id: ObjectId(req.params.id)})
    .then( result =>{
        res.send(result.deletedCount > 0);
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port);