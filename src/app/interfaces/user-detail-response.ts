export interface UserDetailResponse {
    id:string,
    name:string,
    email:string,
    role:string,
    avatar?:string,
    joinDate: Date,
    lastActive:Date,
    status:string,
    project:[string],
    skills:[string]
}
