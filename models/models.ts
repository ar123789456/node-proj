
export type User = {
    id: number,
    name: string,
    password: string,
    token: string
}

export type Todo = {
    id: number,
    title: string,
    description: string,
    status: string,
}

export type Filter = {
    status: string,
    search: string,
    startIndex: number,
    endIndex: number,
}
