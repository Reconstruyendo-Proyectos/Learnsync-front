import { Topic } from "../../topic/interfaces/topic-interfaces";

export interface Category {
    idCategory: number;
    name: string;
    description: string;
    topics: Topic[];
}