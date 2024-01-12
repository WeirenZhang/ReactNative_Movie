export interface IArea {
  theater_top: string;
  theater_list: ITheater[];
}

export interface ITheater {
  id: string;
  name: string;
  adds: string;
  tel: string;
}