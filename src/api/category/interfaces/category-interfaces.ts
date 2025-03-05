import { Topic } from "../../topic/interfaces/topic-interfaces";

export interface Category {
    idCategory: number;
    name: string;
    topics: Topic[]
}