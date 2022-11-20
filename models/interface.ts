import {Todo, User, Filter} from "./models";
//interface for auth service
export interface UseCaseAuth {
    login:  (user: User) => Promise<User>;
    logout: () => Promise<User>;
    register: (user: User) => Promise<User>;
}

export interface RepositoryAuth {
    get: (user: User) => Promise<User>;
    set: (user: User) => Promise<User>;
    update: (user: User) => Promise<User>;
}

//interface for todos service
export interface UseCaseTodo {
    create: (todo: Todo, userid:number) => Promise<Todo>;
    get: (filter: Filter, userid:number) => Promise<Todo[]>;
    update: (todo: Todo, userid:number) => Promise<Todo>;
}

export interface RepositoryTodo {
    get: (filter: Filter, userid:number) => Promise<Todo[]>;
    set: (todo: Todo, userid:number) => Promise<Todo>;
    update: (todo: Todo, userid:number) => Promise<Todo>;
}

