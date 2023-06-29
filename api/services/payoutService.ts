import { Request, Response } from 'express';
import { Payout, Expense, Traveller, PayoutResponse } from '../models/payout.interface';

function isEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-8 ? true: false;
}

function mapPayouts(expenses: Expense[]): PayoutResponse {
  if (!Array.isArray(expenses)) {
    throw new Error('Invalid expenses');
  }

  const travellers = expenses.reduce((tmpTravellers: Traveller, expense: Expense) => {
    tmpTravellers[expense.name] = (tmpTravellers[expense.name] ?? 0) + expense.amount;
    return tmpTravellers;
  }, {});

  const numOfTravellers = Object.keys(travellers).length;
  const totalAmount = Object.keys(travellers).reduce((total: number, key: string) => (total + travellers[key]), 0);
  const average = totalAmount / numOfTravellers;

  Object.keys(travellers).forEach((key: string) => {
    travellers[key] = travellers[key] - average;
  });

  const sortedTravellers = Object.keys(travellers).sort((a: string, b: string) => travellers[a] - travellers[b]);

  let owesId = 0, owedId = numOfTravellers - 1;
  const resultData: Payout[] = [];
  while(owesId < owedId) {
    const owes = travellers[sortedTravellers[owesId]];
    const owed = travellers[sortedTravellers[owedId]];

    if(isEqual(owes, 0)) {
      owesId ++;
      continue;
    }

    if(isEqual(owed, 0)) {
      owedId --;
      continue;
    }

    const rest = owes + owed;

    if(!isEqual(rest, 0)) {
      if(rest < 0) {
        resultData.push({
          owes: sortedTravellers[owesId],
          owed: sortedTravellers[owedId],
          amount: owed,
        });
        owedId --;
        travellers[sortedTravellers[owedId]] = 0;
        travellers[sortedTravellers[owesId]] += owed;
        continue;
      }

      if(rest > 0) {
        resultData.push({
          owes: sortedTravellers[owesId],
          owed: sortedTravellers[owedId],
          amount: -owes,
        });
        owesId ++;
        travellers[sortedTravellers[owedId]] += owes;
        travellers[sortedTravellers[owesId]] = 0;
        continue;
      }
    }

    if(isEqual(rest, 0)) {
      resultData.push({
        owes: sortedTravellers[owesId],
        owed: sortedTravellers[owedId],
        amount: owed,
      });
      owedId --;
      owesId ++;
      travellers[sortedTravellers[owedId]] = 0;
      travellers[sortedTravellers[owesId]] = 0;
      continue;
    }
  }

  return {
    total: totalAmount, 
    equalShare: average, 
    payouts: resultData
  };
}

class PayoutService {
  handleRquest = (req: Request, res: Response) => {
    try {
      const expenses: Expense[] = req.body.expenses;
      const response = mapPayouts(expenses);
      res.send(response);
    } catch(error) {
      res.status(400).send(error);
    }
  }
}

module.exports = { PayoutService };