export type TUser = {
    id:string,
    password:string,
    needPasswordChange:boolean,
    role:'sser' | 'admin' | 'student',
    isDeleted:boolean,
    status:'in-progress'|'blocked'
}

export type newUserCreated = {
    role:string,
    password:string,
    id:string
}