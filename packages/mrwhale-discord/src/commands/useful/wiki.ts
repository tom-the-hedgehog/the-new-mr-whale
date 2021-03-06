import { wiki } from "@mrwhale-io/commands";
import { CommandInteraction, Message } from "discord.js";

import { DiscordCommand } from "../../client/command/discord-command";

export default class extends DiscordCommand {
  constructor() {
    super(wiki.data);
    this.slashCommandData.addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The query terms.")
        .setRequired(true)
    );
  }

  async action(message: Message, [query]: [string]): Promise<Message> {
    return message.reply(await wiki.action(query));
  }

  async slashCommandAction(interaction: CommandInteraction): Promise<void> {
    const query = interaction.options.getString("query");

    return interaction.reply(await wiki.action(query));
  }
}
