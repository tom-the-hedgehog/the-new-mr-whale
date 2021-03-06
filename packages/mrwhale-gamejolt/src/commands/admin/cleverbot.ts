import { Message } from "@mrwhale-io/gamejolt-client";

import { GameJoltCommand } from "../../client/command/gamejolt-command";

export default class extends GameJoltCommand {
  constructor() {
    super({
      name: "cleverbot",
      description: "Toggle cleverbot on/off.",
      type: "admin",
      usage: "<prefix>cleverbot",
      admin: true,
    });
  }

  async action(message: Message): Promise<Message> {
    this.botClient.cleverbot = !this.botClient.cleverbot;

    if (this.botClient.cleverbot) {
      return message.reply("Cleverbot enabled.");
    } else {
      return message.reply("Cleverbot disabled.");
    }
  }
}
