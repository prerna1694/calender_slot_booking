import { PageLayoutModule } from './page-layout.module';

describe('PageLayoutModule', () => {
  let pageLayoutModule: PageLayoutModule;

  beforeEach(() => {
    pageLayoutModule = new PageLayoutModule();
  });

  it('should create an instance', () => {
    expect(pageLayoutModule).toBeTruthy();
  });
});
