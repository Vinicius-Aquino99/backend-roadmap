# Github User Activity CLi

A simple command-line tool to fetch and display recent public activities from a GitHub user.

## Features
 -Fetches the latest public events from a GitHub username

 -Displays activity types like commits, issues, pull requests, stars, forks, and more

 -Handles errors gracefully (e.g., user not found)

 -Colored output for better readability

## Installation 
```bash
git clone https://github.com/Vinicius-Aquino99/backend-roadmap/
cd github-activity-cli
npm install
npm link

```
The command will be globally available as:
```bash
github-activity <username>
```

## Usage
```bash
github-activity vinicius-aquino99
```

Example output:
```bash
- Pushed 1 commit to Vinicius-Aquino99/backend-roadmap
- Pushed 1 commit to Vinicius-Aquino99/backend-roadmap
- Pushed 1 commit to Vinicius-Aquino99/backend-roadmap
- Starred kamranahmedse/developer-roadmap
- Did CreateEvent on Vinicius-Aquino99/backend-roadmap
- Did CreateEvent on Vinicius-Aquino99/backend-roadmap
- Pushed 2 commits to Vinicius-Aquino99/user-crud
- Pushed 1 commit to Vinicius-Aquino99/user-crud
- Pushed 1 commit to Vinicius-Aquino99/user-crud
- Did CreateEvent on Vinicius-Aquino99/user-crud
```

## How it works
The CLI fetches the public GitHub events API endpoint:

```bash
https://api.github.com/users/<username>/events/public
```
It then parses the response and outputs up to 10 recent activities with a human-readable message for each event type.

## Requirements
 - Node.js 18+ (for native fetch support)
 - *node-fetch* if node version are below 18 