/**
 * @file
 * 测试驱动开发，需求全写在测试文件里：
 */
class Validator {
  // 添加自定义到原型链上：
  static add (name, fn) {
    Validator.prototype[name] = fn
  }
  // constructor () {}
  validate (data, rules) {
    let errors = {}
    rules.forEach((rItem) => {
      // key是保留字段，供用户设置的：
      const fieldName = rItem.key
      const value = data[fieldName]
      if (rItem.required) {
        let error = this.required(value)
        if (error) {
          ensureObject(errors, fieldName)
          errors[fieldName].required = error
          return
        }
      }
      // 遍历 validators，并逐一调用对应的校验方法：
      const validatorKeys = Object.keys(rItem).filter(keyInRItem => keyInRItem !== 'key' && keyInRItem !== 'required')
      validatorKeys.forEach(vkItem => {
        if (this[vkItem]) {
          let error = this[vkItem](value, rItem[vkItem])
          if (error) {
            ensureObject(errors, fieldName)
            errors[fieldName][vkItem] = error
          }
        } else {
          throw new Error(`不存在的校验器: ${vkItem}`)
        }
      })
    })
    return errors
  }

  // 应该要分为requiredNumber和requiredString来判断??
  required (value) {
    if (value !== 0 && !value) {
      return '必填'
    }
  }

  pattern (value, pattern) {
    if (pattern === 'email') {
      pattern = /^.+@.+$/
    }
    if (pattern.test(value) === false) {
      return '格式不正确'
    }
  }

  minLength (value, minLength) {
    if (value.length < minLength) {
      return '太短'
    }
  }

  maxLength (value, maxLength) {
    if (value.length > maxLength) {
      return '太长'
    }
  }
}

function ensureObject (obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}

export default Validator
