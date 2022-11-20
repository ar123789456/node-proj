import {User} from "../models/models";
import {RepositoryAuth, RepositoryTodo} from "../models/interface";
import mongoose, {Promise} from "mongoose";

//Auth repository
export class AuthRepository implements RepositoryAuth {
    model: mongoose.Model<mongoose.Document>;

    constructor(model: mongoose.Model<mongoose.Document>) {
        this.model = model;
    }

    get(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
                this.model.findOne({
                        name: user.name,
                    }, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    }
                )
            }
        );
    }

    set(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.model.create(user, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    update(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({
                    name: user.name,
                }, user, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            )
        });
    }
}

//Todos repository
export class TodosRepository implements RepositoryTodo {
    model: mongoose.Model<mongoose.Document>;

    constructor(model: mongoose.Model<mongoose.Document>) {
        this.model = model;
    }

    get(filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.model.find({
                    status: filter.status,
                    title: new RegExp(filter.search, "i")
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            ).skip(filter.startIndex).limit(filter.endIndex - filter.startIndex);
        });
    }

    set(todo: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.model.create(todo, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    update(todo: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({
                    _id: todo._id,
                }, todo, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            )
        });
    }
}