import { UserDTO } from "../../user/interfaces/user-interfaces";

export interface Comment {
    idComment: number;
    message: string;
    creationDate: Date;
    user: UserDTO;
}