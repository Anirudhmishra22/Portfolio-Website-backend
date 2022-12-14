const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://anirudh:anirudh@cluster0.51f7jvs.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "form-data";

var app = Express();
const PORT = process.env.PORT || 80;
let cors = require('cors')
app.use(cors())

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.post("/form", (request, response) => {
    console.log("Requested",request.body)
    collection = database.collection("portfolio");
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/formdata", (request, response) => {
    collection = database.collection("portfolio");
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});




app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("form-data");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
