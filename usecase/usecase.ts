import {RepositoryAuth, RepositoryTodo, UseCaseAuth, UseCaseTodo} from "../models/interface";
import {Filter, Todo, User} from "../models/models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//auth service business logic
export class AuthUsecase implements UseCaseAuth {
    repository: RepositoryAuth;

    constructor(repository: RepositoryAuth) {
        this.repository = repository;
    }

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
                        });
                        resolve(result);
                    } else {
                        reject({message: "User not found"});
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    logout(): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve({id: 0, name: "", password: "", token: ""});
        });
    }

    register(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
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


export class TodosUseCase implements UseCaseTodo {
    repository: RepositoryTodo;

    constructor(repository: RepositoryTodo) {
        this.repository = repository;
    }

    create(todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.repository.set(todo)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    get(filter: Filter): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            this.repository.get(filter)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    update(todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            this.repository.update(todo)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}