import {Schema} from "mongoose";

/**
 * @type {User} User model
 * */
export type User = {
    _id: number,
    name: string,
    password: string,
    token: string
}

/**
 * @interface IUser User interlayer for {@link User} model
 * need for mongoose
 */
export interface IUser {
    _id: number,
    name: string,
    password: string,
    token: string
}

/**
 * @param {UserSchema} User schema for mongoose
 */

export const UserSchema = new Schema({
    _id: Number,
    name: String,
    password: String,
    token: String
})

/**
 * @type {Todo} Todo model
 */
export type Todo = {
    _id: number,
    title: string,
    description: string,
    status: string,
    userid: number
}

/**
 * @interface ITodo interlayer for {@link Todo} model
 */

export interface ITodo {
    _id: number,
    title: string,
    description: string,
    status: string,
    userid: number
}

/**
 * @param {TodoSchema} {Todo} schema for mongoose
 */

export const TodoSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    status: String,
    userid: Number
})

/**
 * @type {Filter} Filter model
 * need for filtering todos
 */

export type Filter = {
    status: string,
    search: string,
    startIndex: number,
    endIndex: number,
}
