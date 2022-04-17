/**
 * 
 *  Create Project
 *
 *  @module lib/create-project
 * 
 *  @description creates a bananasplit project
 *  @author diegoulloao
 * 
 */

import shell from 'shelljs'
import path from "path"
import fs from "fs"

import chalk from 'chalk'
import boxen from 'boxen'

export default function ({ action, project_name, apollo=false, git }) {
  if (action) {
    switch (action) {
      case 'new':
        if (project_name) {
          project_name = project_name.toLowerCase()

          // Just an empty space at the bgginning
          console.log()

          const branch = !apollo ? 'main/template':'main/apollo'
          const clone = shell.exec(`git clone -b ${branch} https://github.com/bananasplit-js/bananasplit-js ${project_name}`)

          if (clone.code === 0) {
            // Browse to project directory
            shell.cd(project_name)

            shell.mv('.env.example', '.env')
            shell.rm('-rf', '.git')
            shell.rm('-rf', '.github')
            shell.rm("public/.gitignore")
            shell.rm("src/providers/addons/.gitignore")

            try {
              // Write README for developers
              let readmeTemplateData = fs.readFileSync(
                path.resolve(__dirname, "../README-template.md"),
                { encoding:'utf8', flag:'r' }
              )

              // Replace project name
              readmeTemplateData = readmeTemplateData.replace("@project-name", project_name)
              readmeTemplateData = readmeTemplateData.replace("@year", new Date().getFullYear())

              // Write changes into new README.md in project directory
              fs.writeFileSync(
                path.resolve(process.cwd(), "README.md"),
                readmeTemplateData
              )

            } catch (e) {
              console.log(chalk.red("\nCould not create README.md file\n"))
              console.log(e)
            }

            // Create main branch, then commit
            if (git) {
              shell.exec(`git init`)
              shell.exec('git checkout -b main')
              shell.exec('git add --all && git commit -am "Start"')
            }

            let infoBox = []

            // Message output
            infoBox.push(chalk.bold.green('New project!'))
            infoBox.push('\n\n' )
            infoBox.push(`${chalk.white('- Name      →')}  ${chalk.yellow(project_name)}`)
            infoBox.push('\n' )
            infoBox.push(`${chalk.white('- Template  →')}  ${chalk.cyanBright( !apollo ? 'express':'express + apollo')}`)
            infoBox.push(`\n${ chalk.white('- Git       →') }  ${chalk[git ? 'green':'red'](git ? 'yes':'no')}`)
            infoBox.push('\n\n')
            infoBox.push(chalk.gray(`Location: ${shell.pwd().toString()}`))

            // Info box
            console.log(
              boxen(infoBox.join(''),
              {
                padding: 1,
                margin: 1,
                borderColor: 'yellow',
                borderStyle: 'bold'
              })
            )

          } else {
            console.log(`\n${chalk.bgRed.black(` ${chalk.bold.black('Error:')} The project could not be created `)}`)
            break
          }

        } else {
          console.log(chalk.bgYellow.black('\n Need to specify a project name '))
        }

        break

      default:
        console.log(chalk.bgRed.black(`\n ${chalk.bold(action)} is not an action `))
    }

  } else {
    console.log(chalk.bgRed.black('\n Action is required '))
  }
}
