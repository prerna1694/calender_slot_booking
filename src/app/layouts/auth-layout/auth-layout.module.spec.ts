import { AuthLayoutModule } from './auth-layout.module';

describe('AuthLayoutModule', () => {
  let authLayoutModule: AuthLayoutModule;

  beforeEach(() => {
    authLayoutModule = new AuthLayoutModule();
  });

  it('should create an instance', () => {
    expect(authLayoutModule).toBeTruthy();
  });
});
