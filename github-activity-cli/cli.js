#!/usr/bin/env node
import { program } from "commander"
import chalk from "chalk"

const success = chalk.green.bold
const error = chalk.red.bold

program
    .name('github activity')
    .description('Get activity from GitHub username')
    .version('1.0.0')

program
    .argument('<username>', 'github user name')
    .action((username) => {
        console.log(success(`Olá, ${username}`))
    })

program.parse()