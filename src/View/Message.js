const { PRIZE, WIN_MONEY } = require('../constants/prize');

class Message {
  static getLottoCountMessage(lottoCount) {
    return `${lottoCount}개를 구매했습니다.`;
  }

  static getLottoNumbersMessage(numbers) {
    return `[${numbers.join(', ')}]`;
  }


  static getProfitRateMessage(profitRate) {
    return `총 수익률은 ${profitRate}입니다.`;
  }
}

module.exports = Message;