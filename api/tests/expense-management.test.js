const controller = require('../payouts/controller');

describe('Test_Exprense', () => {
  test('IT_Should_Calculate_payouts', async () => {
    const expenses = [
      { name: 'ali', amount: 2 },
      { name: 'ali', amount: 2 },
      { name: 'akbar', amount: 10 },
      { name: 'ahmad', amount: 12 },
      { name: 'farukh', amount: 14 },
    ];

    expectedResult = {
      total: 40,
      equalShare: 10,
      payouts: [
        { owes: 'ali', owed: 'ahmad', amount: 2 },
        { owes: 'ali', owed: 'farukh', amount: 4 },
      ],
    };

    const result = controller.payouts({ body: { expenses } });

    expect(expectedResult).toEqual(result);
  });
});
