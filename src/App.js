const PurchasePrice = require('./PurchasePrice')
const Lotto = require('./Lotto')
const WinningNum = require('./WinningNum')
const BonusNum = require('./BonusNum')
const CorrectValue = require('./CorrectValue')
const { Console } = require('@woowacourse/mission-utils')
const { Random } = require('@woowacourse/mission-utils')

class App {
  constructor() {
    this.userLottoNum
    this.winningNum
    this.lottoBonusNum
  }

  play() {
    this.getLottoInfo()
    this.calcLottoResult()
  }


  getLottoInfo() {
    let buyCount = PurchasePrice.getPurchasePrice()
    this.userLottoNum = this.getLottoNum(buyCount)
    this.winningNum = this.getWinningNum()
    this.lottoBonusNum = this.getBounsNum(this.winningNum)
  }

  getLottoNum(buyCount) {
    let count = 0
    let userLottoNum = []
    while (count < Number(buyCount)) {
      //pickUniqueNumbersInRange의 인자를 자세히 보면 인자 하나가 6자리 배열이다
      //즉, 한번에 6자리 로또번호가 들어옴

      //하나씩 넣는걸 의도한 것 같다
      const userLottoPick = Random.pickUniqueNumbersInRange(1, 45)
      let lotto = new Lotto(userLottoPick)
      //구매 결과 출력
      lotto.resultPrint()
      userLottoNum.push(lotto.showLottoNum())
      count++
    }
    return userLottoNum
  }

  getWinningNum() {
    let winningNum
    Console.readLine('당첨 번호를 입력해 주세요', (inputs) => {
      console.log(inputs.split('"').join().split(',').map(Number))
      let winner = new WinningNum(
        inputs.split('"').join().split(',').map(Number),
      )
      //당첨번호  출력
      winner.resultPrint()
      winningNum = winner.showWinningNum()
    })

    return winningNum
  }

  getBounsNum(winningNum) {
    let lottoBonusNum
    Console.readLine('보너스 번호를 입력해 주세요', (bonus) => {
      let bonusNum = new BonusNum(Number(bonus), winningNum)
      bonusNum.resultPrint()
      lottoBonusNum = bonusNum.showBonusNum()
    })

    return lottoBonusNum
  }




  

  calcLottoResult() {
    let correctValueList = this.findCorrectValue(
      this.userLottoNum,
      this.winningNum,
      this.lottoBonusNum,
    )

    let [countNormalWinner,countBonusWinner]=this.findWinnersInfo(correctValueList)

    console.log(countNormalWinner)
    console.log(countBonusWinner)

     
  }

  findCorrectValue(userLottoNum, winningNum, lottoBonusNum) {
    let result = new CorrectValue(
      userLottoNum,
      winningNum,
      lottoBonusNum,
    ).findSameValue()
    return result
  }

  findWinnersInfo(correctValueList){
    let countNormalWinner = new Array(4).fill(0)
    let countBonusWinner = [0]

    for (let i = 0; i < correctValueList.length; i++) {
      if (correctValueList[i][1]) { 
        countBonusWinner[0] += 1
      }
      if (correctValueList[i][0] >= 3 && !correctValueList[i][1]) {
        countNormalWinner[correctValueList[i][0] - 3] += 1
      }
      //[3 4 5 6]
      // 0 1 2 3
    }
    //어차피 더이상 correctValueList는 안 씀
    return [countNormalWinner,countBonusWinner]
  }
}

module.exports = App
