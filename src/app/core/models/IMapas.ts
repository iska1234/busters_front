import { ILugar } from "./ILugar";

export interface RespMarcadores {
  [key: string]: ILugar;
}

export class WayPoints {
  start: any;
  end: any;
}
