export interface IArea {
  id: string;
  area: string;
  data: ITheater[];
}

export interface ITheater {
  id: string;
  name: string;
  adds: string;
  tel: string;
}