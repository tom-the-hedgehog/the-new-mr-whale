import axios from "axios";
import { Content, Message } from "@mrwhale-io/gamejolt";
import * as profanity from "profanity-util";

import { Command } from "../command";

export default class extends Command {
  constructor() {
    super({
      name: "define",
      description: "Define a word or phrase.",
      type: "fun",
      usage: "<prefix>define <word>",
    });
  }

  async action(message: Message, args: string[]) {
    const phrase = args.join(" ");
    const url = `https://api.urbandictionary.com/v0/define?page=1&term=${phrase}`;
    const content = new Content();

    if (!phrase) {
      content.insertText("You must pass word/phrase to define.");

      return message.reply(content);
    }

    const result = await axios.get(url);
    if (!result.data.list || !result.data.list[0]) {
      content.insertText("Could not define this.");

      return message.reply(content);
    }

    content.insertText(
      `${phrase} - ${profanity.purify(result.data.list[0].definition)[0]}`
    );

    return message.reply(content);
  }
}