/**
 * @file
 * 测试驱动开发，需求全写在测试文件里：
 * @todo 异步校验的还没做！！！！
 */
class Validator {
  // 添加自定义到原型链上：
  static add (name, fn) {
    Validator.prototype[name] = fn
  }
  // constructor () {}
  validate (data, rules) {
    let errors = {}
    rules.forEach(rItem => {
      // key是保留字段，供用户设置的：
      const fieldName = rItem.key
      const value = data[fieldName]
      if (rItem.required) {
        let error = this.required(value)
        if (error) {
          ensureTheFieldToBeObject(errors, fieldName)
          errors[fieldName].required = error
          // 因为每一条rule都需要执行一遍，所以这个return的作用是中断一个循环，而不能去跳过后面的那些循环。
          return
        }
      }
      // 遍历 validators，并逐一调用对应的校验方法：
      const validatorKeys = Object.keys(rItem).filter(keyInRItem => keyInRItem !== 'key' && keyInRItem !== 'required')
      validatorKeys.forEach(vkItem => {
        if (this[vkItem]) {
          let error = this[vkItem](value, rItem[vkItem])
          if (error) {
            ensureTheFieldToBeObject(errors, fieldName)
            errors[fieldName][vkItem] = error
          }
        } else {
          // 如果用户写的校验规则不存在并且没有被自定义过，最好报错：
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

// 这个function是比较简陋，但是刚好在这里够用：
function ensureTheFieldToBeObject (obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}

export default Validator
