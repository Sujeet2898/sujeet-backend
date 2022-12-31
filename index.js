import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
export const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}
app.get("/", async(request, response) => {
  response.send("please append appropriate endpoints");
})
app.get("/users", async (request, response) => {
  const client = await createConnection();
  const users = await client.db("tensor").collection("users").find({ }).toArray();
  if (users.length > 0) {
    response.send(users);
  } else {
    response.send({message:"Please fetch users from API by clicking on 'fetch users'"})
  }
});
app.post("/store", async (request, response) => {
  var users = request.body;
  const date = new Date().toLocaleString();
  for(let i=0;i<users.length;i++){
    users[i].created_at = date;
    users[i].updated_at = date;
  }
  const client = await createConnection();
   client.db("tensor").collection("users").insertMany(
      users
    );
});
app.put("/users/:id", async (request, response) => {
  const {id} = request.params;
  const date = new Date().toLocaleString();
  const { name, ID, email, status, gender } = request.body;
  const client = await createConnection();
  const result = await client.db("tensor").collection("users")
    .updateOne({
      id: ID
    },
      {
        $set:{ name: name,
        email:email,
        status:status,
        gender:gender,
        updated_at:date
      }
    })
  response.send(result);

});
app.delete("/deleteUser/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const result = await client.db("tensor").collection("users")
    .deleteOne({
      id:Number(id)
    });
  response.send(result);
});
app.listen(PORT, () => console.log("The server is started"));
