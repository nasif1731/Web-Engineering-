# Multi-Account Bank System

I implemented this bank account simulation where accounts are dynamically created using a student's roll number. The system supports deposits, withdrawals, and transaction tracking while enforcing financial constraints.

## Features
- **Account Generation**: Uses roll number to create a unique account.
- **Initial Deposit**: Last digit of roll number × 1000 PKR.
- **Deposits & Withdrawals**:
  - Deposits must be multiples of the roll number.
  - Withdrawals limited to 80% of balance.
- **Transaction Tracking**: Displays history dynamically.
- **Multiple Accounts**: Users can create and switch between accounts.
- **Download Transaction History**: Saves transactions as a `.txt` file.

## Technologies Used
- HTML, CSS, JavaScript (Vanilla)

## Constraints Handled
- Ensures valid roll number format.
- Uses `reduce()` to calculate total balance.
- Uses `map()`, `set`, and other JavaScript built-in functions.
- Ensures correct deposit and withdrawal conditions.

Enjoy managing your virtual bank accounts! 🚀
