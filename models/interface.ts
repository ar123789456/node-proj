import {Todo, User, Filter} from "./models";
/**
 * @interface UseCaseAuth interlayer between repository and handler for auth service
 */
export interface UseCaseAuth {
    /** @method login take {@link User} with name and password and return full {@link User} */
    login:  (user: User) => Promise<User>;
    /** @method logout take {@link User} and return empty {@link User} need to future */
    logout: () => Promise<User>;
    /** @method register take {@link User} with name and password and return full {@link User} */
    register: (user: User) => Promise<User>;
}

/**
 * @interface RepositoryAuth interlayer between repository and business logic for auth service
 */
export interface RepositoryAuth {
    /** @method get take {@link User} with name and password and return full {@link User} */
    get: (user: User) => Promise<User>;
    /** @method set take {@link User} with name and password and save it in database and return full {@link User} */
    set: (user: User) => Promise<User>;
    /** @method update take {@link User} with name and password and update it in database and return full {@link User} */
    update: (user: User) => Promise<User>;
}

/**
 * @interface UseCaseAuth interlayer between repository and handler for todos service
 */
export interface UseCaseTodo {
    /** @method create take {@link Todo} with name, description and status and return full {@link Todo} */
    create: (todo: Todo, userid:number) => Promise<Todo>;
    /** @method get take {@link Filter} and return array of {@link Todo} by filter */
    get: (filter: Filter, userid:number) => Promise<Todo[]>;
    /** @method update take {@link Todo} with name, description and status and return full {@link Todo} */
    update: (todo: Todo, userid:number) => Promise<Todo>;
}

/**
 * @interface RepositoryTodo interlayer between repository and business logic for todos service
 */
export interface RepositoryTodo {
    /** @method get take {@link Filter} and return array of {@link Todo} by filter */
    get: (filter: Filter, userid:number) => Promise<Todo[]>;
    /** @method set take {@link Todo} with name, description and status and save it in database and return full {@link Todo} */
    set: (todo: Todo, userid:number) => Promise<Todo>;
    /** @method update take {@link Todo} with name, description and status and update it in database and return full {@link Todo} */
    update: (todo: Todo, userid:number) => Promise<Todo>;
}

