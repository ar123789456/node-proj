import {Schema} from "mongoose";

export type User = {
    _id: number,
    name: string,
    password: string,
    token: string
}

export interface IUser {
    _id: number,
    name: string,
    password: string,
    token: string
}

export const UserSchema = new Schema({
    _id: Number,
    name: String,
    password: String,
    token: String
})

export type Todo = {
    _id: number,
    title: string,
    description: string,
    status: string,
    userid: number
}

export interface ITodo {
    _id: number,
    title: string,
    description: string,
    status: string,
    userid: number
}

export const TodoSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    status: String,
    userid: Number
})

export type Filter = {
    status: string,
    search: string,
    startIndex: number,
    endIndex: number,
}
