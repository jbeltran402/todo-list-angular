export interface params{
    todo: string;
    status: boolean;
    start_time: Date;
    finish_time?: Date;
}

export interface List {
    params: params
}
