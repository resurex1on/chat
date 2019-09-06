const { writeFileSync, readFileSync } = require('fs')
const onChange = require('on-change')
class DB {
  constructor(path) {
    this.lastSave = Date.now()
    this.path = path
    try {
      this.db = JSON.parse(readFileSync(path, { encoding: 'utf8' }))
      this._db = onChange(this.db, () => {
        this.save()
      })
      this._db.category = this._db.category || []
    } catch (error) {
      this.db = {
        category: []
      }
      this._db = onChange(this.db, () => {
        this.save()
      })
    }
  }
  save() {
    if (Date.now() - this.lastSave < 500) return
    writeFileSync(this.path, JSON.stringify(this._db))
  }
  get constants() {
    return this._db.constants
  }
  changeble(object, onChange) {
    const $self = this
    const handler = {
      get(target, property, receiver) {
        try {
          return new Proxy(target[property], handler)
        } catch (err) {
          return Reflect.get(target, property, receiver)
        }
      },
      defineProperty(target, property, descriptor) {
        onChange.call($self)
        return Reflect.defineProperty(target, property, descriptor)
      },
      deleteProperty(target, property) {
        onChange.call($self)
        return Reflect.deleteProperty(target, property)
      }
    }

    return new Proxy(object, handler)
  }
}

module.exports = new DB(`./DataBase/data.json`)
