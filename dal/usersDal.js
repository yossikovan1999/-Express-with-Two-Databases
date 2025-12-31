import supabase from "../database/superbase.js";
import HttpError from "../errors/httpError.js";

const DATABASE = "Users";

/**
 * 
 * @param {*} username 
 * @returns - array with one user 
 */
export async function getUserByUsername(username) {
  const { data, error } = await supabase
    .from(DATABASE)
    .select()
    .eq("username", username);
    
    if(error){
       throw new HttpError("user not found", 404)
    }

    if(!data || data.length === 0){ 
      throw new HttpError("user not found", 404)
    }
   

    return data;

}
