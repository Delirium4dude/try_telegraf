import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>){
    super(bot);
  }
  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply("Будешь слушать шутки за 300?", Markup.inlineKeyboard([
        Markup.button.callback("🫤", "face_confused"),
        Markup.button.callback("🤪", "face_stupid")
      ]))
    });

    this.bot.action("face_confused", (ctx) => {
      ctx.session.messageAgree = true;
      ctx.editMessageText("🤌 ке")
    })

    this.bot.action("face_stupid", (ctx) => {
      ctx.session.messageAgree = false;
      ctx.editMessageText("👍 Чётко")
    })
  }
}

