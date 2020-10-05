/**
 * 
 *  Bananasplit client
 *  @version 1.0.0
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

import parseArgumentsIntoOptions from './lib/parse-arguments'
import createBananaProject from './lib/create-project'


export function cli ( args ) {

    // Exit when no git installed
    if ( !shell.which('git') ) {
        console.log( chalk.bgRed.white(`\n This client requires ${chalk.bold.white('git')} `) )
        return ;
    }


    let options = parseArgumentsIntoOptions( args )
    
    if ( options.version )
        console.log( `\n${chalk.bgCyan.black(` Bananasplit Client v${version.substr(0, 3)} `)}` )

    else
        createBananaProject( options )
    ;

}
