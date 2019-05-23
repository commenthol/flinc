# flinc

> recursively include files

[![NPM version](https://badge.fury.io/js/flinc.svg)](https://www.npmjs.com/package/flinc/)

a.txt

```
aaa
!include(./b.txt)
ccc
```

b.txt

```
bbb
```

run `flinc a.txt`

```
aaa
bbb
ccc
```

# cli

```
NAME
       flinc - recursively include files

SYNOPSIS
       flinc [options] <file>

OPTIONS
       -h, --help
              Display this help and exit.

       --version
              Output version information and exit.

       -o, --output outfile
              Specify the filename for the processed output. Defaults to stdout.

       -r, --regex
              regular expression to search for include tags. Defaults to !include(filename)

EXAMPLE
       Process a README.md file:

           flinc -o README.md README.md

       Use a cusom regular expression for tag myinclude filename.txt and output to stdout:

           flinc --regex "^myinclude\s+(.*?)\s*$" mytext.txt

INSTALLATION
       npm i -g flinc

```

# api

> NOTE: Reading files is done synchronously - aka blocking.

```js
const FileInclude = require('flinc')
const { text } = new FileInclude().read(`${__dirname}/a.txt`).build()
```

# license

MIT licensed
