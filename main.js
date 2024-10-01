"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// BANK ACCOUNT CLASS
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // WITHDRAW MONEY
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    // DEPOSIT MONEY
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // Service charge of $1 for deposits over $100
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // CHECK BALANCE
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
}
// CUSTOMER CLASS
class Customer {
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// CREATE BANK ACCOUNTS
const accounts = [
    new BankAccount(1001, 5000),
    new BankAccount(1002, 5500),
    new BankAccount(1003, 500)
];
// CREATE CUSTOMERS
const customers = [
    new Customer("Zubair", "Aftab", "Male", 35, 31123456789, accounts[0]),
    new Customer("Sana", "Amir", "Female", 19, 32123456788, accounts[1]),
    new Customer("Moeez", "Aftab", "Male", 23, 34323456789, accounts[2]),
];
// FUNCTION TO INTERACT WITH BANK ACCOUNTS
function service() {
    return __awaiter(this, void 0, void 0, function* () {
        do {
            const accountNumberInput = yield inquirer_1.default.prompt({
                name: "accountNumber",
                type: "number",
                message: "Enter Your Account Number:",
            });
            const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
            if (customer) {
                console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
                const ans = yield inquirer_1.default.prompt([{
                        name: "select",
                        type: "list",
                        message: "Select an Operation",
                        choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                    }]);
                switch (ans.select) {
                    case "Deposit":
                        const depositAmount = yield inquirer_1.default.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:",
                        });
                        customer.account.deposit(depositAmount.amount);
                        break;
                    case "Withdraw":
                        const withdrawAmount = yield inquirer_1.default.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:",
                        });
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log("Exiting Bank Program...");
                        console.log("\nThank you for using our bank services. Have a great day!");
                        return;
                }
            }
            else {
                console.log("Invalid Account Number. Please try again.");
            }
        } while (true);
    });
}
service();
