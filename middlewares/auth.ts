import express from "express";
import jwt from "jsonwebtoken";

/**@function Auth authorization middleware */
export function Auth(req:express.Request, res:express.Response, next:express.NextFunction) {
    /**@description get token from cookie
     * if token is not present in cookie send 401 status code
     * else verify token and if token is valid call next()
     * */
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, process.env.SIGNATURE_JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Invalid token"});
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
    return;
}