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
    create: (todo: Todo) => Promise<Todo>;
    get: (filter: Filter) => Promise<Todo[]>;
    update: (todo: Todo) => Promise<Todo>;
}

export interface RepositoryTodo {
    get: (filter: Filter) => Promise<Todo[]>;
    set: (todo: Todo) => Promise<Todo>;
    update: (todo: Todo) => Promise<Todo>;
}

