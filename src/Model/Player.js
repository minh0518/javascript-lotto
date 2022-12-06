const LottoGenerator = require('./LottoGenerator');

const { PRIZE } = require('../constants/prize');
const { ERROR } = require('../constants/message');
const SETTING = require('../constants/setting');

class Player {
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
    ]);
  }

  buyLottos(money) {
    this.validateMoney(money);

    const lottoCount = money / SETTING.LOTTO_PRICE;

    this.spentMoney = money;

    //this.lottos에다가 배열을 생성하는데 각 요소에다가 LottoGenerator.publishLotto()를 통해
    //pickUniqueNumbersInRange로 lottoCount만큼 내가 선택한 로또 번호들을 넣어준다
    //즉, LottoGenerator.publishLotto()의 리턴값이 new Lotto(numbers); 이므로
    //이제 각 this.lottos들은 Lotto객체가 된다

    for (let i = 0; i < lottoCount; i++) {
      this.lottos.push(LottoGenerator.publishLotto());
    }
    console.log(this.lottos);
    // [ Lotto {}, .. ] 의 Lotto {}는 Lotto객체를 의미한다

    //Lotto객체의 #numbers에 접근하는 방법을
    //new Lotto클래스 자체를 직접 받고, 여기에서 getter메소드를 통해 받는 것이다
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

module.exports = Player;
