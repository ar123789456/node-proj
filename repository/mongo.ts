import {User} from "../models/models";
import {RepositoryAuth} from "../models/interface";
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