import * as glob from "glob";
import * as path from "path";

import { COMMAND_TYPE_NAMES, loadCommand } from "@mrwhale-io/core";

import { DiscordCommand } from "../src/client/discord-command";

export function loadSlashCommands(): any[] {
  const commands = [];
  const files = [];
  for (const directory of COMMAND_TYPE_NAMES) {
    files.push(
      ...glob.sync(
        `${path.join(__dirname, `../src/commands/${directory}`)}/*.ts`
      )
    );
  }

  for (const file of files) {
    const commandLocation = file.replace(".ts", "");
    const loadedCommand: any = loadCommand(commandLocation, "DiscordCommand");
    const command: DiscordCommand = new loadedCommand();
    commands.push(command.slashCommandData.toJSON());
  }

  return commands;
}