const { Console } = require('@woowacourse/mission-utils');
const Player = require('../Model/Player');
const LottoGenerator = require('../Model/LottoGenerator');
const Message = require('../View/Message');
const { PRIZE, WIN_MONEY } = require('../constants/prize');
const { ASK, ERROR, ALERT } = require('../constants/message');
const SETTING = require('../constants/setting');

class LottoGame {
  constructor() {
    this.player = new Player();
    this.winNumbers = [];
    this.winBonus = null;
  }

  askForPayment() {
    Console.print(ASK.PAYMENT);

    Console.readLine('', (input) => {
      const money = Number(input);

      //로또구입금액 받으면 new Player에 있는 buyLottos에 넣어줌
      this.player.buyLottos(money);

      this.printPlayerLottos();
    });
  }

  printPlayerLottos() {
    this.printLottoCount();
    this.printLottos();
    this.askWinNumbers();
  }

  printLottoCount() {
    //위의 this.player.buyLottos(money)로 인해서 생성된
    //각 요소가 new Lotto(numbers)인 this.player.lottos를 통해 출력
    const lottos = this.player.lottos;
    const lottoCount = lottos.length;
    const lottoCountMessage = Message.getLottoCountMessage(lottoCount);

    Console.print(lottoCountMessage);
  }

  printLottos() {
    //위의 this.player.buyLottos(money)로 인해서 생성된
    //각 요소가 new Lotto(numbers)인  this.player.lottos를 통해 출력
    const lottos = this.player.lottos;

    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers(); //new Lotto의 getNumbers()사용
      const lottoMessage = Message.getLottoNumbersMessage(numbers);
      //lottos는 구입한 횟수만큼 new Lotto()객체가 담겨있다
      //그러므로 각 new Lotto()객체의getNumbers()를 써서 #numbers를 받고
      //그것들을 출력하는 것이다
      Console.print(lottoMessage);
    });
  }

  //당첨번호 받기
  //여기서 당첨번호는 this.winNumbers에 ,
  //보너스 번호는 this.winBonus에 넣는다
  askWinNumbers() {
    Console.print(ASK.WIN_NUMBERS);
    Console.readLine('', (input) => {
      
      const winNumbers=input.split(',').map(Number)

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
    this.player.lottos.forEach((lotto) => {
      const matchCount = lotto.getMatchCount(this.winNumbers);
      const prize = LottoGenerator.judgePrize(lotto, matchCount, this.winBonus);

      if (prize !== PRIZE.LOST) {
        this.player.addPrizeCounts(prize);
        this.player.addWinMoney(WIN_MONEY[prize]);
      }
    });

    this.printStatistics();
  }

  printStatistics() {
    
    Console.print(ALERT.STATISTICS_PREFIX);
    Console.print('---');

    this.endGame();
  }



  endGame() {
    Console.close();
  }
}

module.exports = LottoGame;
