import { RequestHandler, Request, Response } from "express";

interface ExpenseObj {
  name: string;
  amount: number;
}
interface StringArray extends Array<string> {}
interface ExpenseArray extends Array<ExpenseObj> {}
interface DividedArray {
  lower: ExpenseArray;
  higher: ExpenseArray;
}
interface payouts {
  owes: string;
  owed: string;
  amount: number;
}
interface payoutsArray extends Array<payouts> {}
interface resultObj {
  total: number;
  equalShare: number;
  payouts: payoutsArray;
}

/**
 * This getTotal function gets total amount of every travellers.
 *
 * @param   inputArr    Array<ExpenseObj>       array of traveller's name and amount
 * @returns total       Number                  total value of traveller's amount
 */
const getTotal = (inputArr: ExpenseArray) => {
  let total = 0;
  inputArr.forEach((item: ExpenseObj) => {
    total += item.amount;
  });
  return total;
};

/**
 * This getUniqueNameArray function removes all the duplicated names and returns a new name array
 *
 * @param   inputArr        Array<ExpenseObj>       array of traveller's name and amount
 * @returns uniqueNameArr   Array<String>           array of traveller's name which all the duplicated names removed
 */
const getUniqueNameArray = (inputArr: ExpenseArray) => {
  const nameArr: StringArray = [];
  inputArr.forEach((item: ExpenseObj) => {
    nameArr.push(item.name);
  });
  return [...new Set(nameArr)];
};

/**
 * This getNameCount function gets count of different names from name array
 *
 * @param   inputArr    Array<ExpenseObj>   array of traveller's name and amount
 * @returns count       Number              count of different names in name array
 */
const getNameCount = (inputArr: ExpenseArray) => {
  let count = 0;
  count = getUniqueNameArray(inputArr).length;
  return count;
};

/**
 * This getDividedArray function divides expenses array into lower and higher amount array than equalshare
 *
 * @param   inputArr        Array<ExpenseObj>   array of traveller's name and amount
 * @param   equalShare      Number              average amount value of traveller's amount
 * @returns dividedArr      Object              Object which shows lower and higher amount array than equalshare
 */
const getDividedArray = (inputArr: ExpenseArray, equalShare: number) => {
  const lowerArray: ExpenseArray = [];
  const higherArray: ExpenseArray = [];
  const uniqueNameArray = getUniqueNameArray(inputArr);
  uniqueNameArray.forEach((item: string) => {
    let amount = 0;
    inputArr.forEach((element: ExpenseObj) => {
      if (element.name === item) amount += element.amount;
    });

    if (amount < equalShare) lowerArray.push({ name: item, amount: amount });
    else higherArray.push({ name: item, amount: amount });
  });
  const dividedArr = {
    lower: lowerArray,
    higher: higherArray,
  };
  return dividedArr;
};

/**
 * This functions gets an array of payouts which shows all objects of owes, owed and amount.
 *
 * @param   dividedInputArr     Object      Object which shows lower and higher amount array than equalshare
 * @param   equalShare          Number      average amount value of traveller's amount
 * @returns payoutsArray        Array       array of payouts which shows all objects of owes, owed and amount
 */
const getPayoutsArray = (dividedInputArr: DividedArray, equalShare: number) => {
  const lowerArray = dividedInputArr.lower;
  const higherArray = dividedInputArr.higher;
  const payoutsArray: payoutsArray = [];

  let needValue = 0;
  lowerArray.forEach((item: ExpenseObj) => {
    needValue = equalShare - item.amount;
    higherArray.forEach((element: ExpenseObj) => {
      let plusValue = element.amount - equalShare;
      if (plusValue !== 0) {
        let targetValue = needValue > plusValue ? plusValue : needValue;
        element.amount -= targetValue;
        needValue -= targetValue;
        payoutsArray.push({
          owes: item.name,
          owed: element.name,
          amount: Number(targetValue.toFixed(2)),
        });
      }
    });
  });
  return payoutsArray;
};

/**
 * This function gets total, equalshare and payouts array from request.
 * @param req   Request     requested data of expenses
 * @param res   Response    response data of result object
 */

  export const payouts: RequestHandler = (req: Request, res: Response) => {
  const inputArr = req.body.expenses;
  const total = getTotal(inputArr);
  const nameCount = getNameCount(inputArr);
  const equalShare = Number((total / nameCount).toFixed(2));
  const dividedInputArr = getDividedArray(inputArr, equalShare);
  const payoutsArray = getPayoutsArray(dividedInputArr, equalShare);
  const resultObj: resultObj = {
    total: total,
    equalShare: equalShare,
    payouts: payoutsArray,
  };
  res.status(200).json(resultObj);
};
