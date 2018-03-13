const request = require('request');

module.exports = class BotMeteo {
  constructor (city) {
    this.city = city;
  }

  init (callback) {
    var options = {
      'method': 'GET',
      'url': 'https://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&APPID=e56027ed8e31f08aa9649657a656ca7e'
    };

    request(options, (error, response, body) => {
      if (error) {
        return console.error('Failed: %s', error.message);
      }

      console.log('succes ' + body);
      callback(body);
      return body;
    });
  }

  echo () {
    var sync = true;

    this.init(result => {
      this.setJson(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  setJson (json) {
    this.json = JSON.parse(json);
  }

  getJson () {
    return this.json;
  }
};

