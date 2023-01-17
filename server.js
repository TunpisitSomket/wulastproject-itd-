const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World! Let\'s Working with NoSQL Databases')
})


const { MongoClient } = require("mongodb");
const uri = "mongodb://Sarus:000000@localhost:27017/?authMechanism=DEFAULT&authSource=admin";
const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) { 
        console.log(err); 
        process.exit(1); }
}
connectDB();


// Read All API
app.get('/complaints', async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('Restaurant')
        .find({}).sort({ "Date received": -1 }).limit(50).toArray();

    await client.close();
    res.status(200).send(objects);
})

// Create API
app.post('/complaints/create', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('Restaurant').insertOne({
        "Name": object.Name,
        "Type": object.Type,
        "Tel": object.Tel,
        "Opening": object.Opening,
});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object
    });
})


// Update API
const { ObjectId } = require('mongodb')
app.put('/complaints/update', async (req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('Restaurant').updateOne({ '_id': ObjectId(id) }, { 
        "$set": {
            "_id": ObjectId(id),
            "Name": object.Name,
            "Type": object.Type,
            "Tel": object.Tel,
            "Opening": object.Opening,
        }
        });
        
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = “ + id " + "is updated",
        "object": object
    });
})

// Delete API
app.delete('/complaints/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('Restaurant').deleteOne({'_id': ObjectId(id)});
    await client.close();
    res.status(200).send({
    "status": "ok",
    "message": "Object with ID = " + id + " is deleted"});
    })

// Read by id API
app.get('/complaints/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('admin').collection('Restaurant').findOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Complaint with ID = " + id + " is deleted",
        "object":user
    });
})

// Read by id API
app.get('/complaints/findtext/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('Restaurant').find({ $text: { $search: searchText } }).sort({ "FIELD": -1 }).limit(50).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaints": objects
    });
})

// Query by filter API: Search text from Product Name
app.get('/complaints/Type/:searchText', async (req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('admin').collection('Restaurant').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).limit(10).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

// Create API assessment
app.post('/', async (req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').collection('Data').insertOne({
        "id_name": object.id_name,
        "id_old": object.id_old,
        "id_restaurant": object.id_restaurant,
        "id_type": object.id_type,
        "id_quality": object.id_quality,
        "id_price": object.id_price,
        "id_serve": object.id_serve,
        "id_dress": object.id_dress,
        "id_cleanliness": object.id_cleanliness,
        "id_polite": object.id_polite,
    });

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});