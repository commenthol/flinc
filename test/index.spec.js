const { strictEqual: equal } = require('assert')
const FileInclude = require('..')

const norm = (text) => text.replace(/(Circular include of ")(.*?)(\/test)/, '$1$3')

describe('FileInclude', function () {
  it('shall include files', function () {
    const { text } = new FileInclude().read(`${__dirname}/fixtures/d.txt`).build()
    equal(norm(text), 'aaa\nbbb\nccc\naaa\nError: Circular include of "/test/fixtures/folder/b.txt"')
  })
})
