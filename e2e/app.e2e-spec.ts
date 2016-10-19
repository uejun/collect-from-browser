import { CollectFromBrowserPage } from './app.po';

describe('collect-from-browser App', function() {
  let page: CollectFromBrowserPage;

  beforeEach(() => {
    page = new CollectFromBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
