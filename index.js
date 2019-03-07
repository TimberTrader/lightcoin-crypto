
class Account {
  constructor(username) {
  this.username = username;
  this.transactions = [];
  }
  get balance() {
    let balance = 0
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.canWithdraw())  return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    }
  }
  
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  canWithdraw() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  canWithdraw() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const testAccount = new Account('ski-school');

console.log('Starting Balance:', testAccount.balance);

console.log('testing deposit of $12')
t1 = new Deposit(12.00, testAccount);
t1.commit();
console.log('test result:', t1.commit());
console.log('Ending Balance:', testAccount.balance);

console.log('testing withdrawl of $5')
t2 = new Withdrawal(5.00, testAccount);
t2.commit();
console.log('test result:', t2.commit());
console.log('Ending Balance:', testAccount.balance);

console.log('testing can i withdraw $10 which is more than i have ')
t3 = new Withdrawal(10.00, testAccount);
t3.commit();
console.log('test result:', t3.commit());
console.log('Ending Balance:', testAccount.balance);

console.log('can i withdraw $5 which is less than my balance');
t4 = new Withdrawal(5.00, testAccount);
t4.commit();
console.log('test result:', t4.commit());
console.log('Ending Balance:', testAccount.balance);
