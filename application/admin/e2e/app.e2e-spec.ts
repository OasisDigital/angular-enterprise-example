import { PortalPage } from './app.po';

describe('portal App', () => {
  let page: PortalPage;

  beforeEach(() => {
    page = new PortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
