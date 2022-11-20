import express from "express";
import jwt from "jsonwebtoken";
export function Auth(req:express.Request, res:express.Response, next:express.NextFunction) {
    console.log("Auth middleware");
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