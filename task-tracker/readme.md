# Task Tracker CLI

This is the first project of the backend developer-roadmap, a cli app to **manage your tasks**.

## Features:

- Add new tasks
- List all tasks
- Update tasks description
- Mark tasks as 'done' or 'in-progress'
- Delete tasks by id
- Data persistance in a 'tasks.json' file.

## Requirements:

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) (usually comes with node)

## Installation:

1. Clone repository:

```bash
git clone https://github.com/vinicius-aquino99/backend-roadmap.git
cd task-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Make command global (optional, but usefull):

```bash
npm link
```

## Available commands:

1. Adding a new task:

```
tasks add <description>
```

2. Update a task:

```
tasks update <id>
```

3. Delete a task:

```
tasks delete <id>
```

4. List all tasks (or filter by status)

```
tasks list [status]
```

5. Mark task as in-progress:

```
tasks mark-in-progress <id>
```

6. Mark task as done:

```
tasks mark-done <id>
```


