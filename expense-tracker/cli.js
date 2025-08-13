#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { loadData, saveData } from './storage.js';

const success = chalk.green
const info = chalk.blueBright

program
  .name('expense-tracker')
  .description('track your expenses to save some money')
  .version('1.0.0');

//add an expense
program
  .command('add')
  .description('add new expense')
  .requiredOption('--description <text>', 'Expense description')
  .requiredOption('--amount <value>', 'Expense amount')
  .action((options) => {
    const data = loadData();

    const newExpense = {
      id: Date.now(),
      description: options.description,
      amount: parseFloat(options.amount),
      date: new Date()
    };

    data.push(newExpense);
    saveData(data);

    console.log(success(`✅ Expense added successfully: id[${newExpense.id}]`));
  });

// list all expenses
program
  .command('list')
  .description('List all expenses')
  .action(() => {
    const data = loadData();

    const formattedData = data.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleString('pt-BR')
    }))
    console.table(formattedData)
  })

//summarize total expenses
program
  .command('summary')
  .description('Show total expenses, can filter with --month <month>')
  .option('--month <number>', 'Filter by month (of current year)')
  .action((option) => {
    const data = loadData()

    const filteredData = data.filter(el => {
      const date = new Date(el.date)

      if (option.month && date.getMonth() + 1 !== parseInt(option.month)) return false;

      return true
    })

    const sum = filteredData.reduce((acc, e) => acc + e.amount, 0)

    
    console.log(info(`Total expenses: $${sum.toFixed(2)}`))


  })

// delete an expense
program
  .command('delete <id>')
  .description('Delete expense by id')
  .action((id) => {
    const data = loadData()

    const expenseToDelete = data.findIndex(e => e.id == id)
    if(expenseToDelete === -1){
      console.log(chalk.red('Id not found'))
    }

    const removedExpense = data.splice(expenseToDelete,1)
    saveData(data)
    console.log(success(`Expense removed: ${JSON.stringify(removedExpense)}`))
  })

program.parse();
