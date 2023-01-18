import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";

class Bot {
  constructor(private readonly configService: IConfigService){
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
  }

  bot: Telegraf<IBotContext>;
  commands: Command[] = []
  init() {
    this.commands = [new StartCommand(this.bot)];
    for(const command of this.commands){
      command.handle();
    }
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init()
