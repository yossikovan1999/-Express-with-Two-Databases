import { connectMongo } from "../database/mongoCon.js";
import HttpError from "../errors/httpError.js";
import { ObjectId } from "mongodb";

//get the mongo db database.
const db = await connectMongo({
  uri: process.env.MONGO_URL,
  dbName: process.env.MONGO_DATABASE_NAME,
});

//the collection name.
const COLLECTION = "messages";

//===========================================
//                add message
//===========================================
/**
 * add Message
 * @param {*} message
 */
export async function addMessage(message) {
  const result = await db.collection(COLLECTION).insertOne(message);

  if (!result.acknowledged) {
    throw new HttpError("message unable to be added", 400);
  }
}

/**
 * get All Messages
 * @returns
 */
export async function getAllMessages() {
  const result = await db
    .collection(COLLECTION)
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  if (!result) {
    throw new HttpError("error occured when getting messages", 500);
  }

  return result;
}

/**
 * get Messages By User
 * @param {*} userId
 * @returns
 */
export async function getMessagesByUser(userId) {
  const result = await db
    .collection(COLLECTION)
    .find({ userId: Number(userId) })
    .sort({ createdAt: -1 })
    .toArray();

  if (!result) {
    throw new HttpError("error occured when getting messages", 500);
  }

  return result;
}

/**
 * update message
 * @param {*} userId
 * @param {*} content
 * @returns
 */
export async function updateMessage(username, content, msgId) {
  
  console.log(username, content, msgId)
  
  const result = await db
    .collection(COLLECTION)
    .updateOne(
      { username : username, _id: new ObjectId(msgId), updatedAt : new Date() },
      { $set: { content: content } }
    );

  return result;
}

/**
 * delete message.
 * @param {*} username 
 * @param {*} msgId 
 */
export async function deleteMessage(username, msgId){

  const result = await db
    .collection(COLLECTION)
    .deleteOne(
      { username : username, _id: new ObjectId(msgId)}
    );

  if(!result || result.modifiedCount < 1){
    throw new HttpError("Unable to delete message", 403 );
  }  

}
