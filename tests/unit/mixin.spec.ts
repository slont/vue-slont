import mixin from '@/mixins/common'

describe('mixin filters', () => {
  it('toLocaleStr check', () => {
    expect(mixin.filters.toLocaleStr(0)).toBe('0')
    expect(mixin.filters.toLocaleStr('0')).toBe('0')
    expect(mixin.filters.toLocaleStr(0.0)).toBe('0')
    expect(mixin.filters.toLocaleStr('0.0')).toBe('0')
    expect(mixin.filters.toLocaleStr(1000)).toBe('1,000')
    expect(mixin.filters.toLocaleStr('1000')).toBe('1,000')
    expect(mixin.filters.toLocaleStr(1000.5)).toBe('1,000.5')
    expect(mixin.filters.toLocaleStr('1000.5')).toBe('1,000.5')
    expect(mixin.filters.toLocaleStr('aaaa')).toBe('-')
    expect(mixin.filters.toLocaleStr('')).toBe('-')
    expect(mixin.filters.toLocaleStr(null as any)).toBe('-')
    expect(mixin.filters.toLocaleStr(undefined as any)).toBe('-')
    expect(mixin.filters.toLocaleStr(false as any)).toBe('-')
  })

  it('dayjs check', () => {
    expect(mixin.filters.dayjs('0')).toBe('2000/01/01')
    expect(mixin.filters.dayjs('2020-02-02')).toBe('2020/02/02')
    expect(mixin.filters.dayjs('2020-02-02 20:20:20', 'YYYY年M月D日 HH時mm分ss秒')).toBe('2020年2月2日 20時20分20秒')
    expect(mixin.filters.dayjs(0)).toBe('----/--/--')
    expect(mixin.filters.dayjs('')).toBe('----/--/--')
    expect(mixin.filters.dayjs(null)).toBe('----/--/--')
    expect(mixin.filters.dayjs(undefined)).toBe('----/--/--')
    expect(mixin.filters.dayjs(false)).toBe('----/--/--')
  })
})
