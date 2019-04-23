import Validate from './validate'

export default {
  data () {
    return {
      errors: {},
      validator: new Validate()
    }
  },
  methods: {
    myValidate (formData) {
      const { rules, validator } = this
      this.errors = validator.validate(formData, rules)
    }
  }
}
