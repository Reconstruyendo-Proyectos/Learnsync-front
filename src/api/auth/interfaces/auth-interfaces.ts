export interface AuthRequestDTO {
    username: string,
    password: string
}

export interface AuthResponseDTO {
    user: string,
    role: string,
    token: string
}