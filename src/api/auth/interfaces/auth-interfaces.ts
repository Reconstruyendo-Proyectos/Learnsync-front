export interface AuthRequestDTO {
  username: string;
  password: string;
}

export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
}

export interface GoogleTokenRequestDTO {
  idToken: string;
}