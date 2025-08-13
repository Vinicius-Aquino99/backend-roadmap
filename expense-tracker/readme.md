# Expense Tracker CLI

This is the first project of the backend developer-roadmap https://roadmap.sh, a cli app to **manage your Expenses**.

## Features:

- Add new expense
- List all expense
- Summarize expenses (total or by month)
- Delete expense by id
- Data persistance in a 'expense.json' file.

## Requirements:

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) (usually comes with node)

## Installation:

1. Clone repository:

```bash
git clone https://github.com/vinicius-aquino99/backend-roadmap.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Make command global (optional, but usefull):

```bash
npm link
```
4. Must have a expenses.json file in the root.

## Available commands:

1. Adding a new expense:

```
expense-tracker add --description 'text' --amount <value>
```

2. Delete a expense:

```
expense-tracker delete <id>
```
3. List all expenses

```
expense-tracker list
```
4. Summary:
```
expense-tracker summary (--month <value>)
```



