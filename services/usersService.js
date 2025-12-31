import supabase from "../database/superbase.js";
import * as userDal from "../dal/usersDal.js";
import HttpError from "../errors/httpError.js";

const DATABASE = "Users";

//=================================
//         validateUserId
//=================================
export async function validateUserId(username, id) {
  const [user] = await userDal.getUserByUsername(username);

  if (Number(user.id) !== Number(id)) {
    throw new HttpError("user id do not match", 400);
  }
}

//=================================
//            addUser
//=================================
export async function addUser(username, password) {
  const { error } = await supabase
    .from(DATABASE)
    .insert({ username: username, password: password });

  if (error) {
    throw new HttpError(error.details, 400);
  }
}

//=================================
//     getByUsernameAndPassword
//=================================
export async function getByUsernameAndPassword(username, password) {
  const { data, error } = await supabase
    .from(DATABASE)
    .select()
    .eq("username", username)
    .eq("password", password);

  if (error) {
    throw new HttpError("error occured", error.message);
  }

  return { data, error };
}
