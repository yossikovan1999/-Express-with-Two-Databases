import * as usersDal from "../dal/usersDal.js";
import * as messageDal from "../dal/messagesDal.js";
import HttpError from "../errors/httpError.js";
import { validateUserId } from "../services/usersService.js";

//======================================
//             addMessage
//======================================
export async function addMessage(userId, username, content) {
  await validateUserId(username, userId);

  const message = {
    userId,
    username,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await messageDal.addMessage(message);
}

//======================================
//             getAllMessages
//======================================
export async function getAllMessages() {
  return await messageDal.getAllMessages();
}

//======================================
//           getMessagesByUser
//======================================
export async function getMessagesByUser(username, userId, content) {
  await validateUserId(username, userId);

  const messages = await messageDal.getMessagesByUser(userId);

  return messages;
}

//======================================
//           update message
//======================================
export async function updateMessage(username, content, msgId) {
  if (!(username && userId && content && msgId)) {
    throw new HttpError("must include username, user id and content", 400);
  }

  await messageDal.updateMessage(username, content, msgId);
}

//======================================
//           delete message
//======================================
export async function deleteMessage(username, msgId) {
  if (!(username && msgId)) {
    throw new HttpError("must include username, message id", 400);
  }

  await messageDal.deleteMessage(username, msgId);

}
