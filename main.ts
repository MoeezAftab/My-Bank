import inquirer from "inquirer";

// BANK ACCOUNT INTERFACE
interface IBankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

// BANK ACCOUNT CLASS
class BankAccount implements IBankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // WITHDRAW MONEY
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficient Balance.");
        }
    }

    // DEPOSIT MONEY
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1; // Service charge of $1 for deposits over $100
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }

    // CHECK BALANCE
    checkBalance(): void {
        console.log(`Current Balance: $${this.balance}`);
    }
}

// CUSTOMER CLASS
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// CREATE BANK ACCOUNTS
const accounts: BankAccount[] = [
    new BankAccount(1001, 5000),
    new BankAccount(1002, 5500),
    new BankAccount(1003, 500)
];

// CREATE CUSTOMERS
const customers: Customer[] = [
    new Customer("Zubair", "Aftab", "Male", 35, 31123456789, accounts[0]),
    new Customer("Sana", "Amir", "Female", 19, 32123456788, accounts[1]),
    new Customer("Moeez", "Aftab", "Male", 23, 34323456789, accounts[2]),
];

// FUNCTION TO INTERACT WITH BANK ACCOUNTS
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number:",
        });

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an Operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
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
        } else {
            console.log("Invalid Account Number. Please try again.");
        }
    } while (true);
}

service();
