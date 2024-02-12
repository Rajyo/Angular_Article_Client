export class Login{
    constructor(
        public email: string = '',
        public password: string = ''
    ) {}
}

export class Register{
    constructor(
        public email: string = '',
        public username: string = '',
        public password: string = '',
        public name: string = '',
        public nationality: string = 'USA'
    ) {}
}

export class UpdateUser{
    constructor(
        public id: string = '',
        public newUsername: string = '',
        public newName: string = '',
        public newPassword: string = ''
    ) {}
}

export class Article{
    constructor(
        public _id: string = '',
        public author: string | null = localStorage.getItem("userId"),
        public title: string = '',
        public description: string = ''
    ) {}
}

export type User = {
    name: string
    email: string
    nationality: string
    username: string
    _id: string
}

export type LoginData = {
    token: string
    userId: string
}

export type ArticleData = {
    author: {
        username: string
        name: string
        _id: string
    },
    title: string,
    description: string,
    _id: string
}