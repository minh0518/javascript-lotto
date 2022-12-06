const LottoGeneratorLottoGenerator = require('../src/Model/LottoGenerator');
const Lotto = require('../src/Model/Lotto');

const { PRIZE } = require('../src/constants/prize');

describe('LottoGeneratorLottoGenerator 클래스 테스트', () => {
  test('로또 번호를 제대로 만들어 내는지 확인', () => {
    const lotto = LottoGeneratorLottoGenerator.publishLotto();

    expect(lotto).toBeInstanceOf(Lotto);
  });

  test('등수가 제대로 구해지는지 테스트(2등)', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 45]);
    const winCount = 5;
    const winBonus = 45;

    expect(LottoGeneratorLottoGenerator.judgePrize(lotto, winCount, winBonus)).toBe(PRIZE.SECOND);
  });

  test('등수가 제대로 구해지는지 테스트(3등)', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winCount = 5;
    const winBonus = 45;

    expect(LottoGeneratorLottoGenerator.judgePrize(lotto, winCount, winBonus)).toBe(PRIZE.THIRD);
  });

});