// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects

module.exports = {

  url: function () {
    return '/';
  },

  elements: [{
    main: "#homepage"
  }],

  sections: {

    main: {

      selector: '#homepage',
      locateStrategy: 'css selector'

    }
  }
};
