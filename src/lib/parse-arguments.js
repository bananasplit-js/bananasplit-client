/**
 * 
 *  Parse Arguments
 *  @module lib/parse-arguments
 * 
 *  @description parse arguments into options
 *  @author diegoulloao
 * 
 */

import arg from 'arg'

export default function (rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '-g': '--git',
      // '--apollo': Boolean,
      // '-a': '--apollo'
    },
    {
      argv: rawArgs.slice(2)
    }
  )

  return {
    git: args['--git'] || false,
    // apollo: args['--apollo'] || false,
    action: args._[0],
    project_name: args._[1]
  }
}
