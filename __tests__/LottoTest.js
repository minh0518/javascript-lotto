const Lotto = require("../src/Model/Lotto");

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개보다 크면 예외 발생", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외 발생", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  test('당첨 번호 갯수 테스트', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winNumbers = [2, 5, 6, 10, 12, 45];

    expect(lotto.getMatchCount(winNumbers)).toBe(3);
  });

  test('보너스 번호 판별 확인', () => {
    const lotto = new Lotto([1,2,3,4,5,6]);

    expect(lotto.hasWinBonus(6)).toBe(true);
    expect(lotto.hasWinBonus(7)).toBe(false);
  })
});