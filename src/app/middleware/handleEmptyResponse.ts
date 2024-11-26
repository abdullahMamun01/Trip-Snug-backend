import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';


const handleEmptyResponse = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = function (data ) {
  
        if (data.data  && (Array.isArray(data.data) && data.data.length === 0)) {
            data.success = false;
            data.message = 'No data found';
            data.statusCode = httpStatus.NOT_FOUND;
   
        } 
       
        return originalJson.call(this, data);
    };

    next();
};

export default handleEmptyResponse;


