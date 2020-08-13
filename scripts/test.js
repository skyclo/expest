const c = require('chalk')
const { Command } = require('commander')

global.group = async function (descr, funct) {
    try {
        if (!descr || !funct) throw console.error(`\tExpest: ${c.bgYellow(' ⚠ (WARN) ')} Invalid testing group`)
        console.log(`\tGroup: ${descr}`)
        await funct.apply(this)
    } catch (err) {
        console.log(err)
    }
}

global.describe = group

global.it = async function (descr, funct) {
    try {
        if (!descr || !funct) throw console.error(`\t\tExpest: ${c.bgYellow(' ⚠ (WARN) ')} Invalid test`)
        console.log(`\t\tTest: ${descr}`)
        await funct.apply(this)
    } catch (err) {
        console.log(err)
    }
}

global.test = global.it

global.expect = function (value) {
    if (typeof value == "undefined") throw console.error(`\t\t\tExpest: ${c.bgYellow(' ⚠ (WARN) ')} No value was given`)
    return {
        toEqual: function (expectedValue) {
            if (value == expectedValue) {
                console.log(`\t\t\t${c.bold.bgGreen(' ✓ (PASS) ')}`)
            } else {
                console.log(`\t\t\t${c.bgRedBright(' ✕ (FAIL) ')} Expected ${expectedValue}... Received ${value}`)
            }
        }
    }
}

global.Server = require('./appHandler')