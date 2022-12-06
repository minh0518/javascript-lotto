const { Console } = require('@woowacourse/mission-utils');
const User = require('../Model/User');
const LottoGenerator = require('../Model/LottoGenerator');
const Message = require('../View/Message');
const { PRIZE, WIN_MONEY } = require('../constants/prize');
const { ASK, ERROR, ALERT } = require('../constants/message');
const SETTING = require('../constants/setting');

class LottoGame {
  constructor() {
    this.user = new User();
    this.winNumbers = [];
    this.winBonus = null;
  }

  askForPayment() {
    Console.print(ASK.PAYMENT);

    Console.readLine('', (input) => {
      const money = Number(input);
      this.user.buyLottos(money);
      this.printUserLottos();
    });
  }

  printUserLottos() {
    this.printLottoCount();
    this.printLottos();
    this.askWinNumbers();
  }

  printLottoCount() {
    const lottos = this.user.lottos;
    const lottoCount = lottos.length;
    const lottoCountMessage = Message.getLottoCountMessage(lottoCount);

    Console.print(lottoCountMessage);
  }

  printLottos() {
    const lottos = this.user.lottos;

    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      const lottoMessage = Message.getLottoNumbersMessage(numbers);
      Console.print(lottoMessage);
    });
  }

  askWinNumbers() {
    Console.print(ASK.WIN_NUMBERS);
    Console.readLine('', (input) => {
      const winNumbers = input.split(',').map(Number);

      this.validateWinNumbers(winNumbers);

      this.winNumbers = winNumbers;

      this.askWinBonus();
    });
  }

  askWinBonus() {
    Console.print(ASK.WIN_BONUS);
    Console.readLine('', (input) => {
      const winBonus = Number(input);
      this.validateWinBonus(winBonus);

      this.winBonus = winBonus;

      this.calculateResult();
    });
  }

  validateWinNumbers(winNumbers) {
    if (winNumbers.length !== SETTING.NUMBER_COUNT) {
      throw new Error(ERROR.NUMBER_COUNT);
    }

    if (winNumbers.some((number) => !Number.isInteger(number))) {
      throw new Error(ERROR.ONLY_NUMBER);
    }

    if (winNumbers.length !== new Set(winNumbers).size) {
      throw new Error(ERROR.NO_DUPLICATE);
    }

    if (
      Math.min(...winNumbers) < SETTING.MIN_NUMBER ||
      Math.max(...winNumbers) > SETTING.MAX_NUMBER
    ) {
      throw new Error(ERROR.NUMBER_IN_RANGE);
    }
  }

  validateWinBonus(bonus) {
    if (!Number.isInteger(bonus)) {
      throw new Error(ERROR.ONLY_NUMBER);
    }

    if (bonus < SETTING.MIN_NUMBER || bonus > SETTING.MAX_NUMBER) {
      throw new Error(ERROR.NUMBER_IN_RANGE);
    }

    if (this.winNumbers.includes(bonus)) {
      throw new Error(ERROR.NO_DUPLICATE);
    }
  }

  calculateResult() {
    this.user.lottos.forEach((lotto) => {
      const matchCount = lotto.getMatchCount(this.winNumbers);
      const prize = LottoGenerator.judgePrize(lotto, matchCount, this.winBonus);

      if (prize !== PRIZE.LOST) {
        //당첨금액이 존재한다면
        this.user.addPrizeCounts(prize);
        this.user.addWinMoney(WIN_MONEY[prize]);
      }
    });

    this.printStatistics();
  }

  printStatistics() {
    Console.print(ALERT.RESULT);
    Console.print('---');

    this.endGame();
  }

  endGame() {
    Console.close();
  }
}

module.exports = LottoGame;
