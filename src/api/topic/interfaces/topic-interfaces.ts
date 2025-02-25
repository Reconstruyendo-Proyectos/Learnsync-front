import { Thread } from "../../threads/interfaces/thread-interfaces";

export interface Topic {
    idTopic: number;
    name: string;
    description: string;
    slug: number;
    topicIcon: string;
    topicPoster: string;
    threads: Thread[];
}