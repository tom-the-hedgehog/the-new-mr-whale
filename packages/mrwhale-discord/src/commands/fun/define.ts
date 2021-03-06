import { define } from "@mrwhale-io/commands";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";

import { DiscordCommand } from "../../client/command/discord-command";
import { EMBED_COLOR } from "../../constants";

export default class extends DiscordCommand {
  constructor() {
    super(define.data);
    this.slashCommandData.addStringOption((option) =>
      option
        .setName("phrase")
        .setDescription("The phrase or word to lookup.")
        .setRequired(true)
    );
  }

  async action(message: Message, [phrase]: [string]): Promise<Message> {
    const embed = new MessageEmbed()
      .setColor(EMBED_COLOR)
      .setDescription(await define.action(phrase));

    return message.reply({ embeds: [embed] });
  }

  async slashCommandAction(interaction: CommandInteraction): Promise<void> {
    const question = interaction.options.getString("phrase");
    const embed = new MessageEmbed()
      .setColor(EMBED_COLOR)
      .setDescription(await define.action(question));

    return interaction.reply({ embeds: [embed] });
  }
}
