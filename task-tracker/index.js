#!/usr/bin/env node

const { program } = require("commander");
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const tasksFilePath = path.resolve(__dirname, 'tasks.json')

const loadTasks = () => {
    try {
        const data = fs.readFileSync(tasksFilePath, 'utf-8')
        return JSON.parse(data)
    } catch(err) {
        return[]
    }
}

const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2))
}

let tasks = loadTasks();


program
    .name("task-tracker")
    .description("track and manage your tasks")
    .version("1.0.0");

// list all tasks, or filtered ones
program
    .command('list [status]')
    .description('lists all tasks, or filter by status [todo, in-progress, done]')
    .action((status) => {
        const validStatus = ['todo', 'in-progress', 'done']

        if (status && !validStatus.includes(status)) {
            console.log(`Invalid status. Use some of these ${validStatus.join(', ')}`)
            return
        }

        const filteredTasks = status
        ? tasks.filter(task => task.status === status)
        : tasks;

        if(filteredTasks.length === 0){
            console.log(status ? `No tasks with '${status}' marked` : 'No tasks found.')
            return
        }

        console.table(filteredTasks)
    })

// add 
program
    .command('add <task...>')
    .description('add a new task')
    .action((description) => {

        //description is an array of strings, so:
        const taskDescription =  description.join(" ")

        const newTask = {
            id: uuidv4(),
            description: taskDescription,
            status: "todo",
            createdAt: new Date().toLocaleString('pt-BR'),
            updatedAt: new Date().toLocaleString('pt-BR')
        }

        tasks.push(newTask);
        saveTasks(tasks)

        console.log('Task added successfully: ')
        console.log(newTask)
    })

// update
program
    .command('update <id> <task...>')
    .description('update task with <id> to a new <task>')
    .action((id, description) => {
        const taskId = id
        const taskDescription = description.join(' ')

        const foundTask = tasks.find(t => t.id === taskId);

        if (!foundTask) {
            console.log(`Task with id ${taskId} not Found.`)
            return
        }

        foundTask.description = taskDescription
        foundTask.updatedAt = new Date().toLocaleString('pt-BR')

        saveTasks(tasks)

        console.log('Task updated: ')
        console.log(foundTask)
    })

// delete
program
    .command('delete <id>')
    .description('delete task')
    .action((id) => {
        const taskId = id
        const index = tasks.findIndex(task => task.id === taskId)

        if (index === -1) {
            console.log('task not found')
        } else {
            const removedTask = tasks.splice(index, 1)
            saveTasks(tasks)
            console.log('task removed: ')
            console.log(removedTask)
        }
    })

// marking in-progress
program
    .command('mark-in-progress <id>')
    .description('mark task as in-progress')
    .action((id) =>{
        const taskId = id
        const task = tasks.find(t => t.id === taskId)

        if(!task){
            console.log('task not found')
            return 
        }

        task.status = task.status == 'todo' ? 'in-progress' : 'todo'
        task.updatedAt = new Date().toLocaleString('pt-BR')
        saveTasks(tasks)

        console.log('Task marked as in-progress: ')
        console.log(task)
    })


// marking done 
program
    .command('mark-done <id>')
    .description('mark task as done')
    .action((id) => {
        const task = tasks.find(t => t.id === id)

        if(!task){
            console.log("task not found")
        }

        task.status = 'done'
        task.updatedAt = new Date().toLocaleString('pt-BR')
        saveTasks(tasks)
        console.log('task marked as done: ')
        console.log(task)

    })


program.parse(process.argv)