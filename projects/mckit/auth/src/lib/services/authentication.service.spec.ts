import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MCAuthenticationService, MC_AUTH_KEY_STORAGE_TOKEN } from './authentication.service';
import { MC_AUTH_CONFIG } from '../entities/mc-auth-config';
import { MCUser } from '../entities/mc-user';

describe('MCAuthenticationService', () => {
  let service: MCAuthenticationService;
  let httpMock: HttpTestingController;
  let storageSpy: jasmine.SpyObj<StorageMap>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));
    storageSpy.delete.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MC_AUTH_CONFIG, useValue: { baseUrl: 'https://api.example.com/' } },
        { provide: StorageMap, useValue: storageSpy }
      ]
    });

    service = TestBed.inject(MCAuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and initialize with isLogged false when no user in storage', () => {
    expect(service).toBeTruthy();
    expect(service.isLogged()).toBeFalse();
  });

  it('should set isLogged true on initialize when user exists in storage', () => {
    const storedUser: Partial<MCUser> = { id: 1, email: 'stored@example.com' };
    storageSpy.get.and.returnValue(of(JSON.stringify(storedUser)));

    service.initialize();
    expect(service.isLogged()).toBeTrue();
  });

  it('should save user and update isLogged to true', (done) => {
    const user = new MCUser();
    user.id = 5;
    user.email = 'save@example.com';

    service.saveUser(user).subscribe(() => {
      expect(storageSpy.set).toHaveBeenCalledWith(
        MC_AUTH_KEY_STORAGE_TOKEN,
        JSON.stringify(user),
        { type: 'string' }
      );
      expect(service.isLogged()).toBeTrue();
      done();
    });
  });

  it('should get user from storage and parse JSON', (done) => {
    const rawUser = { id: 10, firstname: 'John', email: 'john@example.com' };
    storageSpy.get.and.returnValue(of(JSON.stringify(rawUser)));

    service.getUser().subscribe((user) => {
      expect(user?.id).toBe(10);
      expect(user?.firstname).toBe('John');
      done();
    });
  });

  it('should return undefined from getUser when storage data is empty string', (done) => {
    storageSpy.get.and.returnValue(of(''));

    service.getUser().subscribe((user) => {
      expect(user).toBeUndefined();
      done();
    });
  });

  it('should remove user from storage', (done) => {
    service.removeUser().subscribe(() => {
      expect(storageSpy.delete).toHaveBeenCalledWith(MC_AUTH_KEY_STORAGE_TOKEN);
      done();
    });
  });

  it('should signIn via POST oauth/token and save user', (done) => {
    const mockUser = new MCUser();
    mockUser.id = 42;
    mockUser.access_token = 'tok-123';

    service.signIn({ username: 'admin', password: 'pw' }).subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(storageSpy.set).toHaveBeenCalled();
      expect(service.isLogged()).toBeTrue();
      done();
    });

    const req = httpMock.expectOne('https://api.example.com/oauth/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'admin', password: 'pw', grant_type: 'password' });
    req.flush(mockUser);
  });

  it('should register via POST users, then signIn and save user', (done) => {
    const mockUser = new MCUser();
    mockUser.id = 99;
    mockUser.access_token = 'tok-999';

    service.register({ email: 'new@example.com', password: 'pw' }).subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(service.isLogged()).toBeTrue();
      done();
    });

    const regReq = httpMock.expectOne('https://api.example.com/users');
    expect(regReq.request.method).toBe('POST');
    regReq.flush(mockUser);

    const signReq = httpMock.expectOne('https://api.example.com/oauth/token');
    expect(signReq.request.method).toBe('POST');
    signReq.flush(mockUser);
  });
});
