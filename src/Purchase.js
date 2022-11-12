const { Console } = require('@woowacourse/mission-utils');

class Purchase {
  //구입 금액 입력
  static getPurchasePrice() {
    Console.readLine('구입금액을 입력해 주세요.', (price) => {
      
      
    //fn으로 구현로직을 만들어 놓았으므로 price에 첫번째 값인 8000이 들어감

      Purchase.vaildatePurchasePrice(price)

      Console.print(`${price/1000}개를 구매했습니다.`);
      
      return price
    })
  }

  //구입 금액 예외처리
  static vaildatePurchasePrice(price) {
    //단위 테스트할때 이 메소드만 사용해야 하므로 static사용
    //구입 금액 입력받는 값은 매개변수로 넘길 수가 없기 때문

    if (isNaN(price)) {
      throw Error('[ERROR] 로또 구입 금액은 숫자여야 합니다.')
    }

    const priceNum = Number(price)
    if (priceNum % 1000 !== 0) {
      throw Error('[ERROR] 로또 구입 금액은 1000원 단위여야 합니다.')
    }
  }
}

module.exports = Purchase
