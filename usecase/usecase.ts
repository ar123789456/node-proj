import {RepositoryAuth, UseCaseAuth} from "../models/interface";
import {User} from "../models/models";
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
                        jwt.sign({user: result}, process.env.SECRET_KEY, {expiresIn: "1h"}, (err, token) => {
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