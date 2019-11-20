import dayjs from 'dayjs'

export default {
  filters: {
    toLocaleStr: (val: string | number, defaultValue: string = '-') => {
      const num = Number(val)
      if (['0', '0.0', 0].includes(val)) return '0'
      if (!val) return defaultValue
      return Number.isFinite(num) ? num.toLocaleString() : defaultValue
    },
    dayjs: (val: any, template: string = 'YYYY/MM/DD') => {
      if (!val) return template.replace(/\w/g, '-')
      const result = dayjs(val).format(template)
      const invalid = 'Invalid Date' === result
      if (invalid) {
        return template.replace(/\w/g, '-')
      }
      return result
    }
  },
  computed: {
    version(): string {
      return require('../../package.json').version
    }
  }
}
