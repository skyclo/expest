/* ---------------------------------------------------------------------------------------------- */
/*                                             MODULES                                            */
/* ---------------------------------------------------------------------------------------------- */
const c = require('chalk')  
const { Command } = require('commander')
const path = require('path')
const fs = require('fs')

/* ---------------------------------------------------------------------------------------------- */
/*                                         INITIALIZATION                                         */
/* ---------------------------------------------------------------------------------------------- */
console.log(c.yellowBright(`
  .o oooooooooooo                                               .   o.   
 .8' \`888'     \`8                                             .o8   \`8.  
.8'   888         oooo    ooo oo.ooooo.   .ooooo.   .oooo.o .o888oo  \`8. 
88    888oooo8     \`88b..8P'   888' \`88b d88' \`88b d88(  "8   888     88 
88    888    "       Y888'     888   888 888ooo888 \`"Y88b.    888     88 
\`8.   888       o  .o8"'88b    888   888 888    .o o.  )88b   888 .  .8' 
 \`8. o888ooooood8 o88'   888o  888bod8P' \`Y8bod8P' 8""888P'   "888" .8'  
  \`"                           888                                  "'   
`))

const program = new Command()
process.title = 'expest'
program
    .option('-d, --debug', 'Enable verbose logging and debugging', false)
program.parse(process.argv)

/* ---------------------------------------------------------------------------------------------- */
/*                                              MAIN                                              */
/* ---------------------------------------------------------------------------------------------- */
module.exports = async function () {
    if (program.debug) console.log('Debugging Enabled')

    if (await checkTestsFolderExists()) {
        console.error(`Expest: ${c.bgRedBright(' ✕ (ERROR) ')} No test file was found\n\tTip: Make sure the file is under ./tests/ and ends with ".test.js"`)
        process.exit(1)
    }

    let files = await collectTests()

    if (files) {
        require('./test.js') 
        await files.forEach(async (file) => {
            console.log(`Expest: ${c.bgGray(' i (INFO) ')} Found test file "${file.toString()}"`)
            require(fs.realpathSync(`tests/${file.toString()}`))
        })
    } else {
        console.error(`Expest: ${c.bgRedBright(' ✕ (ERROR) ')} No test file was found\n\tTip: Make sure the file is under ./tests/ and ends with ".test.js"`)
        process.exit(1)
    }



    /* ---------------------------------------------------------------------------------------------- */
    /*                                             METHODS                                            */
    /* ---------------------------------------------------------------------------------------------- */
    async function checkTestsFolderExists () {
        return new Promise((resolve, reject) => {
            fs.access('tests/', fs.constants.F_OK, (err) => {
                resolve(err ? true : false)
            })
        })
    }

    async function collectTests () {
        return new Promise((resolve, reject) => {
            fs.readdir('tests/', (err, files) => {
                resolve(files.length > 0 ? files : null)
            })
        })
    }   
}