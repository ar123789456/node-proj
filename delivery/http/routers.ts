import {UseCaseAuth, UseCaseTodo} from "../../models/interface";
import express from "express";
import jwt from "jsonwebtoken";

//authorization handlers
export class AUTH {
    usecase: UseCaseAuth;

    constructor(usecase: UseCaseAuth) {
        this.usecase = usecase;
    }

    //login handler
    login(req: express.Request, res: express.Response) {
        const {name, password}: { name: string, password: string } = req.body;
        if (name && password) {
            this.usecase.login({_id: 0, name: name, password: password, token: ""})
                .then((result) => {
                    res.cookie("token", result.token, {maxAge: 900000});
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } else {
            res.status(400).json({message: "Invalid request"});
        }
    }

    //logout handler
    logout(req: express.Request, res: express.Response) {
        const {name, password}: { name: string, password: string } = req.body;
        if (name && password) {
            this.usecase.login({_id: 0, name: name, password: password, token: ""})
                .then((result) => {
                    res.cookie("token", result.token, {maxAge: 0});
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } else {
            res.status(400).json({message: "Invalid request"});
        }
    }

    //register handler
    register(req: express.Request, res: express.Response) {
        const {name, password}: { name: string, password: string } = req.body;
        if (name && password) {
            this.usecase.register({_id: 0, name: name, password: password, token: ""})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } else {
            res.status(400).json({message: "Invalid request"});
        }
    }
}

//todos handlers
export class TODO {
    usecase: UseCaseTodo;

    constructor(usecase: UseCaseTodo) {
        this.usecase = usecase;
    }

    //create handler
    create(req: express.Request, res: express.Response) {
        const {title, description, status}: { title: string, description: string, status: string } = req.body;
        jwt.verify(req.cookies.token, process.env.SIGNATURE_JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Invalid token"});
            } else {
                if (title && description && status) {
                    this.usecase.create({
                        _id: 0,
                        title: title,
                        description: description,
                        status: status,
                        userid: decoded._id
                    }, decoded._id)
                        .then((result) => {
                            res.status(200).json(result);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
                } else {
                    res.status(400).json({message: "Invalid request"});
                }
            }
        });

    }

    //get handler
    get(req: express.Request, res: express.Response) {
        const {
            status,
            search,
            startIndex,
            endIndex
        }: { status: string, search: string, startIndex: number, endIndex: number } = req.body;
        console.log(req.body);
        jwt.verify(req.cookies.token, process.env.SIGNATURE_JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Invalid token"});
            } else {
                this.usecase.get({
                    status: status,
                    search: search,
                    startIndex: startIndex,
                    endIndex: endIndex
                }, decoded._id)
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            }
        });
    }

    //update handler
    update(req: express.Request, res: express.Response) {
        const {
            _id,
            title,
            description,
            status
        }: { _id: number, title: string, description: string, status: string } = req.body;
        jwt.verify(req.cookies.token, process.env.SIGNATURE_JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Invalid token"});
            } else {
                if (title && description && status) {
                    this.usecase.create({
                        _id: _id,
                        title: title,
                        description: description,
                        status: status,
                        userid: decoded._id
                    }, decoded._id)
                        .then((result) => {
                            res.status(200).json(result);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
                } else {
                    res.status(400).json({message: "Invalid request"});
                }
            }
        });
    }
}