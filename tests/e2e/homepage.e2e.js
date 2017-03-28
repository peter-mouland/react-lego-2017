let homePage;
let pageLayout;

module.exports = {
  '@tags': ['staging', 'production'],
  before(browser) {
    homePage = browser.page.homepage();
    pageLayout = browser.page.layout();
    browser.pageLoaded('/', { selector : '#homepage' });
  },

  ['homepage layout should include  content blocks'](browser) {
    browser.expect.element('.layout__main').to.be.present;
    browser.expect.element('.layout__content').to.be.present;
  },

  ['user can request content'](browser) {
    browser.expect.element('.results__value').not.to.be.present;
    browser.safeClick('.form__button');
    browser.waitForElementPresent('.results__value', 1000);

    browser.expect.element('.results__value').to.be.present;
  },
};
