import { ControlsDemoPage } from './app.po';

describe('controls-demo App', () => {
  let page: ControlsDemoPage;

  beforeEach(() => {
    page = new ControlsDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
