import { Types } from "./MovieTime";

export interface IDateTheater {
    date: string;
    data: ITheater[];
}

export interface ITheater {
    id: string;
    release_foto: string;
    theaterlist_name: string;
    en: string;
    icon: string;
    types: Types[];
}