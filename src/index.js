const fs = require('fs')
const path = require('path')

class FileInclude {
  constructor ({ regex, _circular } = {}) {
    Object.assign(this, {
      regex: regex || /^!include\((.*)\)\s*$/mg,
      _circular: _circular || []
    })
  }
  read (filename) {
    filename = path.resolve(process.cwd(), filename)
    this.data = fs.readFileSync(filename, 'utf8')
    this.dirname = path.dirname(filename)
    return this
  }
  build () {
    this.text = this.data.replace(this.regex, (_0, filename) => {
      filename = path.resolve(this.dirname, filename)
      if (this._circular.includes(filename)) {
        return `Error: Circular include of "${filename}"`
      } else {
        this._circular.push(filename)
        const text = new FileInclude(this).read(filename).build().text
        this._circular.pop()
        return text
      }
    })
    return this
  }
  log () {
    console.log(this.text) // eslint-disable-line no-console
  }
  write (filename) {
    fs.writeFileSync(filename, this.text, 'utf8')
  }
}

module.exports = FileInclude
