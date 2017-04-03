import { AgentPage } from './app.po';

describe('agent App', () => {
  let page: AgentPage;

  beforeEach(() => {
    page = new AgentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
