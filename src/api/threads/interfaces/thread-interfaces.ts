import { UserDTO } from "../../user/interfaces/user-interfaces";

export interface Thread {
    idThread: number;
    title: string;
    message: string;
    creationDate: Date;
    user: UserDTO;
    comments: Comment[];
    likes: number;
    stars: number;
}