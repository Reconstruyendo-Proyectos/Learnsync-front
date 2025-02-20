export interface UserDTO {
    username: string,
    email: string,
    creationDate: Date,
    banDate: Date,
    points: number,
    profilePhoto: string,
    role: RoleDTO
}

export interface RoleDTO {
    roleName: string
}