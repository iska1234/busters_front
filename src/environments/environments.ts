import { SocketIoConfig } from "ngx-socket-io";

const config: SocketIoConfig = { url: 'http://localhost:5500', options: {} };
export const environment = {
  production: false,
  socketConfig:config,
  wsUrl: 'http://localhost:5500',
  mapboxAccessToken: 'pk.eyJ1IjoiaXNrYTEiLCJhIjoiY2x4MTQ2MDFoMDJpczJub203NWhsamowcCJ9.gNJnLM-4_3TG7JYhSYiyoQ'
}
