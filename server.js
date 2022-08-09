const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://anirudh:anirudh@cluster0.51f7jvs.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "form-data";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;


/**POST*/
app.post("/form", (request, response) => {
    collection = database.collection("portfolio");
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});
// app.post("/restaurant", (request, response) => {
//     collection.insert(request.body, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result.result);
//     });
// });


/**GET*/
// app.get("/restaurant", (request, response) => {
//     collection.find({}).toArray((error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });
/**GET*/
app.get("/formdata", (request, response) => {
    collection = database.collection("portfolio");
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

/**GET:ID*/
// app.get("/restaurant/:id", (request, response) => {
//     collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });


app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("iwp");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
