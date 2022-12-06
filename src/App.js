const LottoGame = require('./Controller/LottoGame');

class App {
  play() {
    let lottoGame = new LottoGame();
    lottoGame.askForPayment();
  }
}

module.exports = App;
