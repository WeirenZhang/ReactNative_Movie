export interface IMovieDateTab {
    date: string;
    list: IMovieTimeTab[];
}

export interface data {
    label: string;
    value: number;
}

export interface IMovieTimeTab {
    area: string;
    data: IMovieTimeResult[];
}

export interface IMovieTimeResult {
    id: string;
    theater: string;
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