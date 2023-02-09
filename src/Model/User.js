const LottoGenerator = require('./LottoGenerator');

const { PRIZE } = require('../constants/prize');
const { ERROR } = require('../constants/message');
const SETTING = require('../constants/setting');

class User {
  constructor() {
    this.spentMoney = 0;
    this.lottos = [];
    this.winMoney = 0;
    this.prizeCounts = new Map([
      [PRIZE.FIFTH, 0],
      [PRIZE.FOURTH, 0],
      [PRIZE.THIRD, 0],
      [PRIZE.SECOND, 0],
      [PRIZE.FIRST, 0],
      //등수 , 갯수
    ]);
  }

  buyLottos(money) {
    this.validateMoney(money);

    const lottoCount = money / SETTING.LOTTO_PRICE;

    for (let i = 0; i < lottoCount; i++) {
      this.lottos.push(LottoGenerator.publishLotto());
    }
  }

  //1000원 단위 ,1000원 이하까지도 예외처리
  validateMoney(money) {
    if (!Number.isInteger(money / SETTING.LOTTO_PRICE)) {
      throw new Error(ERROR.LOTTO_PRICE);
    }

    if (money < SETTING.LOTTO_PRICE) {
      throw new Error(ERROR.MIN_MONEY);
    }
  }

  addPrizeCounts(prize) {
    const prizeCount = this.prizeCounts.get(prize);

    this.prizeCounts.set(prize, prizeCount + 1);
  }

  addWinMoney(winMoney) {
    this.winMoney += winMoney;
  }

  getProfitRate() {
    return `${((this.winMoney / this.spentMoney) * 100).toFixed(1)}%`;
  }
}

module.exports = User;
