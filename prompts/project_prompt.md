# Project: To-Do List Web App
I want to create a basic web app to-do list app for tracking personal tasks.

## Tech Stack
- Front end: React
    - React framework: Next.js
- Backend: no backend for now. Save all state on the client browser for the first pass version of the app.

## Data Model

### Task
Represents a to-do list task. Must have the following data at minimum:
- Task name: String [required]
    - e.g. "Hang pictures"
- Task category: String [required]
    - e.g. "Home", "Financial", "Car", etc.
- Due Date: Datetime [required]
- Tag: List<String> [optional]
    - Optional list of one or more tags to help organize more complex projects

### Categories
For the first pass, include a set of static categories:
- Home
- Finance
- Auto
- Personal Care
- Social
- Fitness

## UI
The UI must have the following basic components:

### Sidebar Tabs
The app will contain a sidebar with clickable tabs representing different to-do list categories:
1. Inbox: a list of all Tasks
2. Today: a list of all Tasks due today
3. Upcoming: a list of all Tasks due in the future

### Main View
When a sidebar tab is clicked, the main view will render the appropriate Task list. The view should render tasks as follows:
1. Inbox:
    1. Section has header: "Inbox"
    2. Under the header, render all tasks in the following order:
        1. Tasks with no Due Date
        2. Tasks with Due Date in ascending order
2. Today:
    1. Overdue Tasks render first, in a section labeled "Overdue", in `Due Date` order, ascending (most overdue first)
    2. Remaining Tasks render under overdue Tasks, in a section labeled as follows: `{%B} {%d} - Today - {%A}` (using `strftime` format tokens)
3. Upcoming
    1. Section has header: "Upcoming"
    2. Under "Upcoming" header, render section "Overdue"
        1. Render tasks ordered by Due Date ascending
    3. Under "Overdue" section, render remaining tasks, grouped by Due Date in sections
        1. Section header format (today or tomorrow): `{%B} {%d} - {Today | Tomorrow} - {%A}`
        2. Section header format (all other future days): `{%B} {%d} - {%A}`

### Rendering a Task
When rendering a taks, render the following information:
- Checkbox: when checked, mark the task as completed
- Name of the task
- Due date of the task
    - When overdue, due date is in red text for better visibility
- Task category
- Task tags (lighter font, less prominent)

### Task Interactions
#### Completing a Task
When the user clicks the checkbox for a task, do the following:
1. Mark the task as completed
2. Record the datetime the task was completed
3. Increment a daily "Task Completed" count

#### Adding a Task
At the bottom of all UI sections with a task list, show an "Add task" button. When clicked, open a modal dialog over the current UI view, with the following elements:
- Task name: String input box
- Due Date: date picker element to set the task due date
- Category picker: dropdown list of available categories
- Task Tag: multi-value picklist where user can enter a custom tag, press Enter, and have the tag render as a new picklist element

Buttons:
1. "Create Task": creates the Task
2. "Cancel": closes the modal dialog without creating a Task

#### Editing a Task
For existing tasks, the user can click on a task element, and a modal dialog will pop up with the following elements:
- Existing Task Name: editable String input
- Checkbox: user can click the checkbox and mark the Task as completed
- Category picker: user can select a new category for the Task
- Task Tag: user can add new Tags or remove existing Tags using the multi-value picklist selector

Buttons:
1. "Save": updates the Task properties if the user made any changes
2. "Cancel": closes the edit modal dialog without making any changes

## CSS
Use a clean, light-themed CSS style for the overall app. I will tweak the app styling at a future time.