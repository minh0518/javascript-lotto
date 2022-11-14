const { Console } = require('@woowacourse/mission-utils')
const WinningNum = require('./WinningNum')

class BonusNum {
  #bonus

  //입력받은 보너스 번호 , 로또 당첨 번혼
  constructor(bonus, winningNumForDuplication) {
    this.validate(bonus, winningNumForDuplication)
    this.#bonus = bonus
    this.winningNumForDuplication = winningNumForDuplication
  }

  validate(bonus, winningNumForDuplication) {
    this.validateForNumRange(bonus)
  }

  validateForNumRange(bonus) {
    if (bonus < 1 || bonus > 45) {
      throw new Error('[ERROR] 보너스 번호는 1에서 45사이의 숫자여야 합니다')
    }
  }
}

module.exports = BonusNum
