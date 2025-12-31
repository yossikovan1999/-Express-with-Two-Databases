import HttpError from "../errors/httpError.js";

function errorMiddleware(err, req, res, next){
    
    console.error("Error:", err.message);

    if(err instanceof HttpError){
        
        return res.status(err.code).json({error : err.message});
    }
    
    return res.status(500).json({error : "internal server error."})
}

export default errorMiddleware;