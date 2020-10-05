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
import arg from 'arg'
import shell from 'shelljs'
import chalk from 'chalk'
import boxen from 'boxen'

import { version } from './../package.json'


function parseArgumentsIntoOptions ( rawArgs ) {

    const args = arg(
        {
            '--git': Boolean,
            '-g': '--git',
            '--apollo': Boolean,
            '-a': '--apollo',
            '--version': Boolean,
            '-v': '--version'
        },
        {
            argv: rawArgs.slice(2)
        }
    )

    return {
        git: args['--git'] || false,
        apollo: args['--apollo'] || false,
        action: args._[0],
        project_name: args._[1],
        version: args['--version'] || false
    }

}


function createBananaProject ({ action, project_name, apollo, git }) {

    if ( action ) {

        switch ( action ) {
            case 'new':
                if ( project_name ) {
                    console.log()

                    const branch = !apollo ? 'main/template':'main/apollo'
                    const clone = shell.exec( `git clone -b ${branch} https://github.com/bananasplit-js/bananasplit-js ${project_name}` )

                    if ( clone.code === 0 ) {
                        shell.rm([ `${project_name}/README.md`, `${project_name}/LICENSE` ])
                        shell.rm( '-rf', `${project_name}/.git` )
                        shell.rm( '-rf', `${project_name}/.github` )

                        if ( git )
                            shell.exec( `cd ${project_name} && git init` )
                        ;

                        let infoBox = []
                        
                        // Message output
                        infoBox.push( chalk.bold.green('New project!') )
                        infoBox.push( '\n\n' )
                        infoBox.push( `${ chalk.white('- Name      →') }  ${ chalk.yellow(project_name) }` )
                        infoBox.push( '\n' )
                        infoBox.push( `${ chalk.white('- Template  →') }  ${ chalk.cyanBright( !apollo ? 'express':'express + apollo') }` )
                        infoBox.push( `\n${ chalk.white('- Git       →') }  ${ chalk[ git ? 'green':'red' ]( git ? 'yes':'no' ) }` )
                        infoBox.push( '\n\n' )
                        infoBox.push( chalk.gray(`Location: ${ shell.pwd().toString() }/${project_name }`) )

                        // Info box
                        console.log( boxen(infoBox.join(''), {
                            padding: 1,
                            margin: 1,
                            borderColor: 'yellow',
                            borderStyle: 'bold'
                        }) )

                    } else {

                        console.log( `\n${chalk.bgRed.white(` ${chalk.bold.white('Error:')} The project could not be created `)}` )
                        break
                    }

                } else {
                    console.log( chalk.bgYellow.black('\n Need to specify a project name ') )
                }

                break
            ;
            

            default:
                console.log( chalk.bgRed.white(`\n ${chalk.bold(action)} is not an action ` ) )
            ;

        }

    } else {
        console.log( chalk.bgRed.white('\n Action is required ') )
    }

}

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
