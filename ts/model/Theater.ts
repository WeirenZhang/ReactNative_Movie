export interface ITheater {
    id: string;
    release_foto: string;
    theaterlist_name: string;
    en: string;
    icon: string;
    tapbox: ITapbox[];
    theater_time: ITheater_time[];
}

export interface ITapbox {
    name: string;
}

export interface ITheater_time {
    name: string;
}