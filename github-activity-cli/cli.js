#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

const success = chalk.yellow.bold;
const error = chalk.red.bold;
const info = chalk.blue;

program
  .name("github activity")
  .description("Get activity from GitHub username")
  .version("1.0.0");

program.argument("<username>", "github user name").action(async (username) => {
  const url = `https://api.github.com/users/${username}/events/public`;
  console.log(success(url));

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`User '${username}' not found`);
    }

    const events = await response.json();

    if (events.length === 0) {
      console.log(info("There are no recent activity."));
    }

    console.log(success(`Recent activities from ${username}:\n`));

    events.slice(0, 10).forEach((event) => {
      const repoName = event.repo.name;

      let message = "";

      switch (event.type) {

        case "PushEvent":
          const commits = event.payload.commits.length;
          message = `Pushed ${commits} commit${
            commits > 1 ? "s" : ""
          } to ${repoName}`;
          break;

        case "IssuesEvent":
          message = `Opened a new issue in ${repoName}`;
          break;

        case "IssueCommentEvent":
          message = `Commented on an issue in ${repoName}`;
          break;

        case "PullRequestEvent":
          message = `Opened a pull request in ${repoName}`;
          break;

        case "WatchEvent":
          message = `Starred ${repoName}`;
          break;

        case "ForkEvent":
          message = `Forked ${repoName}`;
          break;

        default:
          message = `Did ${event.type} on ${repoName}`;
          break;
      }

      console.log(info(`- ${message}`));
    });
  } catch (err) {
    console.error(error("Error during fetching data, ", err));
  }
});

program.parse();
