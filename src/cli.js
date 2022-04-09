/**
 * 
 *  Bananasplit client
 *  @version 1.4.0
 * 
 *  @author diegoulloao
 *  @license Apache 2.0
 * 
 *  2020
 * 
 */

import shell from 'shelljs'
import chalk from 'chalk'

import { version } from './../package.json'
import help from './help.json'

import parseArgumentsIntoOptions from './lib/parse-arguments'
import createBananaProject from './lib/create-project'

export function cli (args) {
  // Exit when no git installed
  if (!shell.which('git')) {
    console.log(chalk.bgRed.black(`\n This client requires ${chalk.bold.black('git')} `))
    return ;
  }

  if (/--version|-v/.test(args[2])) {
    console.log(`\n${chalk.bgYellow.black(` Bananasplit Client v${version.substr(0, 3)} `)}`)

  } else if (/--help|-h/.test(args[2])) {
    console.log(`\nUsage: ${chalk.yellow('bananasplit-js')} <action> <value> <options>`)
    console.log('\nOptions:')

    help.options.forEach(option => {
      console.log(`${chalk.green(option.param)}\t\t${option.desc}\t\t${chalk.gray(`[${option.type}]`)}`)
    })

  } else {
    let options = parseArgumentsIntoOptions(args)
    createBananaProject(options)
  }
}
