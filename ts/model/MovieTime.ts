export interface IMovieTimeTab {
    id: number;
    area: string;
    data: IMovieTimeResult[];
}

export interface IMovieTimeResult {
    id: string;
    theater: string;
    tel: string;
    types: Types[];
}

export interface Types {
    types: ITypes[];
    times: ITimes[];
}

export interface ITypes {
    type: string;
}

export interface ITimes {
    time: string;
}