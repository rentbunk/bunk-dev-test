const request = require('supertest');
const app = require('../index');

describe('Payouts Route', () => {
  test('POST /payouts should return a valid response', async () => {
    const expenses = [
      { name: "Adriana", amount: 5.75 },
      { name: "Adriana", amount: 5.75 },
      { name: "Bao", amount: 12 }
    ];

    const response = await request(app)
      .post('/payouts')
      .send({ expenses })
      .expect(200);

    expect(response.body).toEqual({
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

  test('Should return 400 for invalid expenses', async () => {
    const expenses = 'invalid';
    await request(app)
      .post('/payouts')
      .send({ expenses })
      .expect(400);
  });
});