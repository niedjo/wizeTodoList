# wizeTodoList

## Description

wizeTodoList App is a task management application designed to manage a list of actions to be performed. It allows users to create, modify, and delete tasks, each of which can be assigned to a specific person.

## Features

- Create, edit, and delete tasks
- Assign tasks to individuals
- View task details
- Filter tasks based on specific criteria
- Implement pagination for task listing
- Mocked data handling in the frontend

## Technologies Used

- **React.js**: Frontend framework for building user interfaces
- **Vite**: Next generation frontend tooling for modern web development
- **TypeScript**: Strict syntactical superset of JavaScript adding optional static typing
- **Axios**: Promise-based HTTP client for making API requests
- **axios-mock-adapter**: Mock adapter for Axios to mock API responses
- **Material-UI**: React components for faster and easier web development

## Models

### Todo

- **title**: Title of the task (string)
- **assignee**: Person assigned to the task (Assignee)
- **startDate**: Start date of the task (Date)
- **endDate**: End date of the task (Date)
- **priority**: Priority level of the task (Enum)
- **labels**: Labels associated with the task (Enum[])
- **description**: Description of the task (string)

### Assignee

- **name**: Name of the person (string)
- **email**: Email address of the person (string)
- **phone**: Phone number of the person (string)

## Usage

1. Clone the repository:

    ```bash
    git clone https://github.com/niedjo/wizeTodoList.git
    ```

2. Install dependencies:

    ```bash
    cd todolist-app
    pnpm install
    ```

3. Run the application:

    ```bash
    pnpm start
    ```
