import { Context } from "telegraf";

export interface ISessionData {
  messageAgree: boolean; // any key posible
}

export interface IBotContext extends Context {
  session: ISessionData;
}