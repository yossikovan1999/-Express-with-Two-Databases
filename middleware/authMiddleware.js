import HttpError from "../errors/httpError.js";
import { getByUsernameAndPassword } from "../services/usersService.js";

async function authMiddleware(req, res, next) {
  try {
    const { username, password } = req.body;
   
    const data = await getByUsernameAndPassword(username, password);
    
    if(!data || data.length === 0){
        throw new HttpError("username or password is incorrect.", 401);
    }

    next();
    
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
