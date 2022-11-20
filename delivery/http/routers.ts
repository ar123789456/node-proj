import {UseCaseAuth, UseCaseTodo} from "../../models/interface";
import express from "express";
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
            this.usecase.login({id: 0, name: name, password: password, token: ""})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
        res.status(400).json({message: "Invalid request"});
    }

    //logout handler
    logout(req: express.Request, res: express.Response) {
        const {name, password}: { name: string, password: string } = req.body;
        if (name && password) {
            this.usecase.login({id: 0, name: name, password: password, token: ""})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
        res.status(400).json({message: "Invalid request"});
    }

    //register handler
    register(req: express.Request, res: express.Response) {
        const {name, password}: { name: string, password: string } = req.body;
        if (name && password) {
            this.usecase.login({id: 0, name: name, password: password, token: ""})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
        res.status(400).json({message: "Invalid request"});
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
        if (title && description && status) {
            this.usecase.create({id: 0, title: title, description: description, status: status})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
        res.status(400).json({message: "Invalid request"});
    }

    //get handler
    get(req: express.Request, res: express.Response) {
        const {status, search, startIndex, endIndex}: { status: string, search: string, startIndex: number, endIndex: number } = req.body;
        if (status && search && startIndex && endIndex) {
            this.usecase.get({status: status, search: search, startIndex: startIndex, endIndex: endIndex})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
        res.status(400).json({message: "Invalid request"});
    }

    //update handler
    update(req: express.Request, res: express.Response) {
        const {id, title, description, status}: {id:number, title: string, description: string, status: string } = req.body;
        if (title && description && status) {
            this.usecase.create({id: id, title: title, description: description, status: status})
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
        res.status(400).json({message: "Invalid request"});
    }
}