import { FormControl } from '@angular/forms';
import { frequencyValidator } from './frequency.validator';

describe('frequencyValidator', () => {
  const validator = frequencyValidator();

  it('should return null for empty or undefined control values', () => {
    expect(validator(new FormControl(''))).toBeNull();
    expect(validator(new FormControl(undefined))).toBeNull();
  });

  it('should return null for valid cron expressions', () => {
    expect(validator(new FormControl('0 12 * * *'))).toBeNull();
    expect(validator(new FormControl('*/15 * * * 1-5'))).toBeNull();
  });

  it('should return invalidFrequency error for invalid cron expressions', () => {
    const control = new FormControl('invalid cron');
    expect(validator(control)).toEqual({
      invalidFrequency: { value: 'invalid cron' },
    });
  });
});

