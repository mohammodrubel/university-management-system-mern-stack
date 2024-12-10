export type TUser = {
    id:string,
    password:string,
    needPasswordChange:boolean,
    role:'user' | 'admin' | 'student' | 'faculty',
    isDeleted:boolean,
    status:'in-progress'|'blocked'
}

export type newUserCreated = {
    role:string,
    password:string,
    id:string
}