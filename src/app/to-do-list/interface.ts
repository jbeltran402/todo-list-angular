export interface Task{
    taskDescription: string;
    status: boolean;
    start_time: Date;
    finish_time?: Date;
}

export interface TaskList {
    params: Task;
}
