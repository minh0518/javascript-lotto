const User = require('../src/Model/User');

const { PRIZE } = require('../src/constants/prize');

describe('User 클래스 테스트', () => {
  test('1000원 단위의 금액만 살 수 있다.', () => {
    const player = new User();

    expect(() => {
      player.buyLottos(100);
      //1000원 단위 ,1000원 이하까지 동시에 예외처리하기 위해 100을 넣음
    }).toThrow('[ERROR]');
  });


  //각 기능에 대해서도 단위테스트
  test('player에게 당첨 횟수를 추가한다.', () => {
    const player = new User();

    for (let count = 0; count < 5; count += 1) {
      player.addPrizeCounts(PRIZE.FOURTH);
    }

    expect(player.prizeCounts.get(PRIZE.FOURTH)).toBe(5);
  });

  test('player에게 당첨 금액을 추가한다.', () => {
    const player = new User();
    const winMoney = 15612;

    player.addWinMoney(winMoney);

    expect(player.winMoney).toBe(15612);
  });

  test('player의 수익률을 반환한다.', () => {
    const player = new User();

    player.buyLottos(90000);
    player.addWinMoney(60000);

    expect(player.getProfitRate()).toBe('66.7%');
  });
});