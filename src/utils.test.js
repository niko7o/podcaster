import { 
  isDateOlderThanADay, 
  getReadableDuration, 
  getReadableDate
} from './utils'

describe('isDateOlderThanADay', () => {
  it('should return "true" if Date given is older than a day', () => {
    const date = new Date('2020-01-19T03:37:39.590Z');
    const value = isDateOlderThanADay(date);
    expect(value).toEqual(true)
  })

  it('should return "false" if Date given is 1 hour old', () => {
    const now = new Date();
    const dateFromAnHourAgo = now.setHours(now.getHours() - 1);
    const value = isDateOlderThanADay(dateFromAnHourAgo);
    expect(value).toEqual(false)
  })

  it('should return "false" if Date given is 23 hours old', () => {
    const now = new Date();
    const dateFromAnHourAgo = now.setHours(now.getHours() - 23);
    const value = isDateOlderThanADay(dateFromAnHourAgo);
    expect(value).toEqual(false)
  })
})

describe('getReadableDuration', () => {
  it('given a number of milliseconds it returns them in a readble hh:mm:ss format', () => {
    const ms = 9520000;
    const expectedAmount = '02:38:40'
    const value = getReadableDuration(ms);
    expect(value).toEqual(expectedAmount)
  })
})

describe('getReadableDate', () => {
  it('given a raw Date it should convert it to a more human readable format', () => {
    const date = new Date('2023-01-18T08:00:00Z');
    const expectedFormat = '18/01/2023'
    const value = getReadableDate(date);
    expect(value).toEqual(expectedFormat)
  })
})
