import {SpellResult, DefaultDisplayType} from './spell-result'

describe('Class SpellResult', () => {
  describe('static method isObject', () => {
    it('should return true only for objects', () => {
      expect(SpellResult.isObject({})).toBe(true)
      expect(SpellResult.isObject([])).toBe(false)
      expect(SpellResult.isObject(new Promise((resolve) => {}))).toBe(false)
      expect(SpellResult.isObject('')).toBe(false)
      expect(SpellResult.isObject(110)).toBe(false)
      expect(SpellResult.isObject(1.10)).toBe(false)
      expect(SpellResult.isObject(function() {})).toBe(false)
    })
  })

  describe('method getAllParsedDataWithTypes', () => {
    it('should return parsed spell with provided type from promise', (done) => {
      const promise = new Promise(resolve => resolve('<div>It works!</div>'))
      const spell = new SpellResult(promise, DefaultDisplayType.HTML)

      spell.getAllParsedDataWithTypes({'%test': true}, '%test', '')
        .then(parsedData => {
          const [dataWithType] = parsedData

          expect(dataWithType.data.trim()).toEqual('<div>It works!</div>')
          expect(dataWithType.type).toEqual(DefaultDisplayType.HTML)

          done()
        })
    })
  })
})
