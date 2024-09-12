# FleetManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

"component":task

modal response
{
   "taskOwner": "Durai",
      "taskName": "Internal Project",
      "description": "ongoing",
      "startDate": "2024-08-21",
      "dueDate": "2024-08-31",
      "reminder": "2024-08-25",
      "priority": "Medium",
      "status": "In Progress",
      "id": "b807"
}


Here’s a breakdown of the data types for each field within the JSON object:

taskOwner: "Durai" — String
taskName: "Internal Project" — String
description: "ongoing" — String
startDate: "2024-08-21" — String (formatted as a date, but JSON treats it as a string)
dueDate: "2024-08-31" — String (formatted as a date, but JSON treats it as a string)
reminder: "2024-08-25" — String (formatted as a date, but JSON treats it as a string)
priority: "Medium" — String
status: "In Progress" — String
id: "b807" — String

Required Endpoints
The following are the key endpoints required to manage the task resource:

1. Create a New Task
Method: POST
Endpoint: /api/tasks
Request Body: The task object in JSON format (see the example above).
Description: Create a new task.

2. Get All Tasks
Method: GET
Endpoint: /api/tasks
Description: Retrieve a list of all tasks.

3. Get a Single Task
Method: GET
Endpoint: /api/tasks/{id}
Description: Retrieve a task by its unique ID.

4. Update a Task
Method: PUT
Endpoint: /api/tasks/{id}
Request Body: The updated task object in JSON format.
Description: Update the details of an existing task by its unique ID.

5. Delete a Task
Method: DELETE
Endpoint: /api/tasks/{id}
Description: Delete a task by its unique ID.

Task Object Properties
taskOwner: string.
taskName: string.
description: A brief description of the task.
startDate: The starting date of the task in YYYY-MM-DD format.
dueDate: The due date of the task in YYYY-MM-DD format.
reminder: The reminder date for the task in YYYY-MM-DD format.
priority: The priority level of the task (e.g., Low, Medium, High).
status: The current status of the task (e.g., In Progress, Completed, etc.).
id: A unique identifier for the task.

//