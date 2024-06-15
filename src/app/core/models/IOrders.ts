export interface IOrders {
  id:string;
  userid:string;
  name: string;
  lastname:string;
  lng:number;
  lat:number;
  status:string;
  timestamp:string;
  clientId?:number;
  clientname?: string;
  clientphone?:string;
  clientreference?:string;
}
