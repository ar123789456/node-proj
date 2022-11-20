import {RepositoryAuth, RepositoryTodo, UseCaseAuth, UseCaseTodo} from "../models/interface";
import {Filter, Todo, User} from "../models/models";
import jwt from "jsonwebtoken";
import {Promise} from "mongoose";
import bcrypt from 'bcrypt';

/**auth service business logic*/
export class AuthUsecase implements UseCaseAuth {
    repository: RepositoryAuth;

    constructor(repository: RepositoryAuth) {
        this.repository = repository;
    }
    /**@method login take {@link User} with name and password generate token and return full {@link User}*/
    login(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.repository.get(user)
                .then((result) => {
                    if (result) {
                        let passwordIsValid = bcrypt.compareSync(user.password, result.password);
                        if (!passwordIsValid) {
                            reject({message: "Invalid password"});
                        }
                        jwt.sign({user: result}, process.env.SIGNATURE_JWT_SECRET, {expiresIn: "3h"}, (err, token) => {
                            if (err) {
                                reject(err);
                            }
                            result.token = token;
                            resolve(result);
                        });
                    } else {
                        reject({message: "User not found"});
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    /**@method logout take {@link User} and return empty {@link User} need to future*/
    logout(): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve({_id: 0, name: "", password: "", token: ""});
        });
    }
    /**@method register take {@link User} with name and password and return full {@link User}*/
    register(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            user.password = bcrypt.hashSync(user.password, 7);
            this.repository.set(user)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

/**todos service business logic*/
export class TodosUseCase implements UseCaseTodo {
    repository: RepositoryTodo;

    constructor(repository: RepositoryTodo) {
        this.repository = repository;
    }
    /**@method create take {@link Todo} and return full {@link Todo}*/
    create(todo: Todo, userid:number): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.repository.set(todo, userid)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    /**@method get take {@link Filter} and return array of {@link Todo} by filter*/
    get(filter: Filter, userid:number): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            this.repository.get(filter, userid)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    /**@method update take {@link Todo} and return full {@link Todo}*/
    update(todo: Todo, userid:number): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.repository.update(todo, userid)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}