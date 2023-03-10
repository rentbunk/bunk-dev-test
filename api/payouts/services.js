module.exports = {
  /**

  Calculates payouts for a group of expenses.
  @param {Array} expenses - An array of objects representing expenses.
  @returns {Object} - An object with the total, equalShare, and payouts for the expenses.
  @example
  const expenses = [
  { name: 'ali', amount: 10 },
  { name: 'ahmad', amount: 8 },
  { name: 'ali', amount: 15 },
  { name: 'farukh', amount: 7 },
  ];
  const result = payouts(expenses);
  console.log(result);
  // Output: { total: 40, equalShare: 10, payouts: [ { owes: 'ali', owed: 'ahmad', amount: 2 }, { owes: 'ali', owed: 'farukh', amount: 4 } ] }
  */
  payouts(expenses) {
    const groupedExpensesByName = this.groupedExpensesByName(expenses);

    const total = this.getTotalAmout(groupedExpensesByName);

    const equalShare = total / groupedExpensesByName.length;

    const payouts = this.calculatePayouts(groupedExpensesByName, equalShare);

    return {
      total,
      equalShare,
      payouts,
    };
  },

  /**
   * Groups expenses by name and calculates the total amount for each name.
   *
   * @param {Array<{name: string, amount: number}>} expenses - An array of expense objects
   * @returns {Array<{name: string, amount: number}>} - An array of grouped expenses with their total amount
   *
   * @example
   *
   * // Returns [{ name: 'aliana', amount: 2200 }, { name: 'bao', amount: 300 }]
   * const expenses = [
   *   { name: 'aiana', amount: 1000 },
   *   { name: 'aliana', amount: 200 },
   *   { name: 'aliana', amount: 1000 },
   *   { name: 'bao', amount: 300 }
   * ];
   * groupedExpensesByName(expenses);
   */
  groupedExpensesByName(expenses) {
    return expenses.reduce((accumulator, expense) => {
      const existingExpense = accumulator.find((item) => item.name === expense.name);
      if (existingExpense) {
        existingExpense.amount += expense.amount;
      } else {
        accumulator.push({ name: expense.name, amount: expense.amount });
      }
      return accumulator;
    }, []);
  },

  /**
   * Calculates the total amount of expenses.
   *
   * @param {Array<{name: string, amount: number}>} expenses - An array of expense objects
   * @returns {number} - The total amount of all expenses
   *
   * @example
   *
   * // Returns 700
   * const expenses = [
   *   { name: 'alian', amount: 2000 },
   *   { name: 'bao', amount: 500 },
   * ];
   * getTotalAmout(expenses);
   */
  getTotalAmout(expenses) {
    return expenses.reduce((totalAmount, expense) => {
      return totalAmount + expense.amount;
    }, 0);
  },

  /**
   * Calculates the payouts for expenses among a group of people.
   *
   * @param {Array<{name: string, amount: number}>} expenses - An array of expense objects
   * @param {number} average - The average amount per person
   * @returns {{
   *   payouts: Array<{owes: string, owed: string, amount: number}>
   * }} - An Array containing payouts for expenses
   *
   * @example
   *
   * // Returns {
   * //   total: 40,
   * //   equalShare: 10,
   * //   payouts: [
   * //     { owes: 'ali', owed: 'ahmad', amount: 2 },
   * //     { owes: 'ali', owed: 'farukh', amount: 4 }
   * //   ]
   * // }
   * const expenses = [
   *   { name: 'ali', amount: 2 },
   *   { name: 'ali', amount: 2 },
   *   { name: 'ahmad', amount: 12 },
   *   { name: 'farukh', amount: 14 }
   * ];
   * const average = 10;
   * calculatePayouts(expenses, average);
   */
  calculatePayouts(expenses, average) {
    // Calculate the total amount owed by each person
    const amountsOwed = {};
    for (let i = 0; i < expenses.length; i++) {
      const name = expenses[i].name;
      const amount = expenses[i].amount - average;
      amountsOwed[name] = amount;
    }

    // Determine who owes money to who owed
    const payouts = [];
    for (let i = 0; i < expenses.length; i++) {
      const name = expenses[i].name;
      const amountOwed = amountsOwed[name];
      let obj = { name, owes: null, owed: null };
      if (amountOwed > 0) {
        obj.owed = amountOwed.toFixed(2);
      } else if (amountOwed < 0) {
        obj.owes = (-amountOwed).toFixed(2);
      }

      payouts.push(obj);
    }

    const finalPayouts = [];

    payouts
      .filter((payout) => payout.owes)
      .forEach((payout) => {
        payouts
          .filter((_payout) => _payout.owed && _payout.name !== payout.name && _payout.owed !== '0.00')
          .forEach((_payout) => {
            const amount = Math.min(payout.owes, _payout.owed);
            finalPayouts.push({ owes: payout.name, owed: _payout.name, amount: amount });
            payout.owes = (payout.owes - amount).toFixed(2);
            _payout.owed = (_payout.owed - amount).toFixed(2);
          });
      });

    return finalPayouts;
  },
};
