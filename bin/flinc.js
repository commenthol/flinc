#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const FileInclude = require('..')

const argv = () => {
  const argv = process.argv.slice(2)
  const cmd = {}
  while (argv.length) {
    const arg = argv.shift()
    switch (arg) {
      case '-h':
      case '-?':
      case '--help':
        cmd.help = true
        break
      case '--version':
        cmd.version = true
        break
      case '-o':
      case '--output':
        cmd.output = argv.shift()
        break
      case '-r':
      case '--regex':
        cmd.regex = new RegExp(argv.shift(), 'mg')
        break
      default:
        cmd.input = arg
        break
    }
  }
  return cmd
}

const cmd = argv()

if (cmd.version) {
  version()
} else if (cmd.help) {
  help()
} else if (cmd.output) {
  new FileInclude(cmd).read(cmd.input).build().write(cmd.output)
} else {
  new FileInclude(cmd).read(cmd.input).build().log()
}

/* eslint-disable no-console */

function version () {
  console.log('v' + require('../package.json').version)
  process.exit(0)
}

function help () {
  console.log(fs.readFileSync(path.resolve(__dirname, '..', 'man', 'flinc.txt'), 'utf8'))
  process.exit(0)
}
