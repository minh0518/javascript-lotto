const { PRIZE, WIN_MONEY } = require('../constants/prize');

class Message {
  static getLottoCountMessage(lottoCount) {
    return `${lottoCount}개를 구매했습니다.`;
  }

  static getLottoNumbersMessage(numbers) {
    return `[${numbers.join(', ')}]`;
  }

  
}

module.exports = Message;