import {Filter, ITodo, IUser, Todo, User} from "../models/models";
import {RepositoryAuth, RepositoryTodo} from "../models/interface";
import {Model, Promise} from "mongoose";

//Auth repository
export class AuthRepository implements RepositoryAuth {
    model: Model<IUser>;

    constructor(model: Model<IUser>) {
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
            this.model.create({
                _id: Date.now(), //todo: change to uuid
                name: user.name,
                password: user.password,
                token: user.token
            }, (err, result) => {
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
    model: Model<ITodo>;

    constructor(model: Model<ITodo>) {
        this.model = model;
    }

    get(filter: Filter, userid:number): Promise<any> {
        return new Promise((resolve, reject) => {
            let fltr = {
                userid: userid,
                status: filter.status,
                title: new RegExp(filter.search, "i")
            }
            this.model.find(!filter.search&&!filter.status?{}:fltr, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            ).skip(filter.startIndex).limit(filter.endIndex - filter.startIndex);
        });
    }

    set(todo: Todo, userid:number): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.model.create({
                _id: Date.now(), //todo: change to uuid
                title: todo.title,
                description: todo.description,
                status: todo.status,
                userid: userid
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    update(todo: Todo, userid:number): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({
                    _id: todo._id,
                    userid: userid
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