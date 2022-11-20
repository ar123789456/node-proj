import {UseCaseAuth} from "../../models/interface";
import express from "express";
//authorization handlers
export default class AUTH {
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