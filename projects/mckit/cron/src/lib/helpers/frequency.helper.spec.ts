import { isValidCron } from './frequency.helper';

describe('isValidCron (frequency.helper)', () => {
  it('should validate standard 5-field cron expressions', () => {
    expect(isValidCron('* * * * *')).toBeTrue();
    expect(isValidCron('0 0 * * *')).toBeTrue();
    expect(isValidCron('*/5 9-17 1,15 1-6 1-5')).toBeTrue();
    expect(isValidCron('30 4 1,15 * 5')).toBeTrue();
  });

  it('should reject expressions with wrong number of fields', () => {
    expect(isValidCron('* * * *')).toBeFalse();
    expect(isValidCron('* * * * * *')).toBeFalse();
    expect(isValidCron('')).toBeFalse();
  });

  it('should validate 6-field cron expressions when seconds option is enabled', () => {
    expect(isValidCron('0 15 10 * * *', { seconds: true })).toBeTrue();
    expect(isValidCron('*/10 * * * * *', { seconds: true })).toBeTrue();
    expect(isValidCron('60 * * * * *', { seconds: true })).toBeFalse();
  });

  it('should reject out-of-range values for minutes, hours, days, months, and weekdays', () => {
    expect(isValidCron('60 * * * *')).toBeFalse();
    expect(isValidCron('* 24 * * *')).toBeFalse();
    expect(isValidCron('* * 0 * *')).toBeFalse();
    expect(isValidCron('* * 32 * *')).toBeFalse();
    expect(isValidCron('* * * 0 *')).toBeFalse();
    expect(isValidCron('* * * 13 *')).toBeFalse();
    expect(isValidCron('* * * * 7')).toBeFalse();
  });

  it('should support allowSevenAsSunday option', () => {
    expect(isValidCron('0 0 * * 7', { allowSevenAsSunday: true })).toBeTrue();
    expect(isValidCron('0 0 * * 8', { allowSevenAsSunday: true })).toBeFalse();
  });

  it('should support month and weekday aliases when alias option is enabled', () => {
    expect(isValidCron('0 0 * jan-mar mon-fri', { alias: true })).toBeTrue();
    expect(isValidCron('0 0 * jan-mar mon-fri', { alias: false })).toBeFalse();
    expect(isValidCron('0 0 * foo mon', { alias: true })).toBeFalse();
  });

  it('should support allowBlankDay (?) on day or weekday but not both simultaneously', () => {
    expect(isValidCron('0 0 ? * 1', { allowBlankDay: true })).toBeTrue();
    expect(isValidCron('0 0 15 * ?', { allowBlankDay: true })).toBeTrue();
    expect(isValidCron('0 0 ? * ?', { allowBlankDay: true })).toBeFalse();
    expect(isValidCron('0 0 ? * 1', { allowBlankDay: false })).toBeFalse();
  });

  it('should support allowNthWeekdayOfMonth (#)', () => {
    expect(isValidCron('0 0 * * 5#2', { allowNthWeekdayOfMonth: true })).toBeTrue();
    expect(isValidCron('0 0 * * 5#6', { allowNthWeekdayOfMonth: true })).toBeFalse();
    expect(isValidCron('0 0 * * 5#2', { allowNthWeekdayOfMonth: false })).toBeFalse();
  });

  it('should reject malformed steps and ranges', () => {
    expect(isValidCron('*/ * * * *')).toBeFalse();
    expect(isValidCron('*/*/* * * * *')).toBeFalse();
    expect(isValidCron('*/0 * * * *')).toBeFalse();
    expect(isValidCron('10-5 * * * *')).toBeFalse();
  });
});

