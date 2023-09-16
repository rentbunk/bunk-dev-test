const { mapPayouts } = require('../services/payoutService');

describe('Payouts Reliability', () => {
  test('Should calculate correct payouts', () => {
    const expenses = [
      { name: "Adriana", amount: 5.75 },
      { name: "Adriana", amount: 5.75 },
      { name: "Bao", amount: 12 }
    ];
    const result = mapPayouts(expenses);
    expect(result).toEqual({
      total: 23.5,
      equalShare: 11.75,
      payouts: [
        {
          owes: "Adriana",
          owed: "Bao",
          amount: 0.25
        }
      ]
    });
  });

  test('Should calculate correct payouts with more complex input', () => {
    const expenses = [
      { "name": "AAA", "amount": 200 },
      { "name": "BBB", "amount": 200 },
      { "name": "CCC", "amount": 150 },
      { "name": "DDD", "amount": 270 },
      { "name": "EEE", "amount": 250 },
      { "name": "FFF", "amount": 150 },
      { "name": "GGG", "amount": 180 }
    ];
    const result = mapPayouts(expenses);
    expect(result).toEqual({
      total: 1400,
      equalShare: 200,
      payouts: [
        {
          owes: "CCC",
          owed: "DDD",
          amount: 50
        },
        {
          owes: "FFF",
          owed: "DDD",
          amount: 20
        },
        {
          owes: "FFF",
          owed: "EEE",
          amount: 30
        },
        {
          owes: "GGG",
          owed: "EEE",
          amount: 20
        }
      ]
    });
  });

  test('Should throw error for invalid expenses', () => {
    const expenses = 'invalid';
    expect(() => mapPayouts(expenses)).toThrow('Invalid expenses');
  });
});
