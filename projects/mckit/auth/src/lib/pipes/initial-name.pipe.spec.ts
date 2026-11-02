import { InitialNamePipe } from './initial-name.pipe';
import { MCUser } from '../entities/mc-user';

describe('InitialNamePipe', () => {
  let pipe: InitialNamePipe;

  beforeEach(() => {
    pipe = new InitialNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return initials of firstname and lastname', () => {
    const user = new MCUser();
    user.firstname = 'Matias';
    user.lastname = 'Camiletti';
    expect(pipe.transform(user)).toBe('MC');
  });

  it('should return only first letter of firstname if lastname is empty', () => {
    const user = new MCUser();
    user.firstname = 'Matias';
    user.lastname = '';
    expect(pipe.transform(user)).toBe('M');
  });
});
