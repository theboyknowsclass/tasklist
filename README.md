# Task List Project

Based on the following spec:


>The candidate would need to build a full stack application. The frontend should be written in React and typescript and the backend in Express and TypeScript. The database of choice should be PostGresSQL and the queries should be written in vanilla SQL using the PG package (no fancy ORMs).
> 
>The application should have an authentication page and 2 protected pages.
> 
>Page 1 should have one input box where the user can create a task then there should be a column where all the tasks can be stored/displayed. The user will have the option drag and drop the tasks in whatever order they like inside the “column”.
> 
>Finally when the components unmounts all the results and ORDER of the task on the column needs to be saved in the database. If  new session starts and the user navigates to that page the “tasks” from the database needs to be fetched and placed back in the column in the same order.
> 
>Page 2 can just have a h1 header. The only purpose of the second page is so the user can navigate between the 2 pages and the content of the Page1 should be stored on a global state (preferable either redux or Zustand) so once you navigate back to Page 1 , the content (i.e. the order of the tasks on that column is as it used to be before the user navigated away from that page)
> 
> NOTE : THE CSS is not important on this task you can have as basic/simple CSS as you would like.
> 
>Final request is to have 1 test written for both frontend and backend (any type of test you like)

## Assumptions

1. Global list of tasks, not per user
2. No method to remove tasks
3. The only method to save the task list is to 'unmount' the component - i.e. navigate away from the screen

## Technologies Used

1. I'm using Azure AD B2C for Auth which supports plain email or Microsoft Accounts as an IdP
2. The main Express endpoints for task data are protected using MSAL as well
3. Frontend is built using React, Typescript, Vite, React Query, with tests in Vitest
4. Backend is built in Express using the Pg package

## Futher Comments

1. Rather than have a seperate Auth page, i default to the User Login Flow
2. Currently the Progres database user is hardcoded on the express side, this could be enhanced with Entra ID or similar for more granular permissions
3. Currently we have hardcoded SQL queries encapsulate the queries in posgres functions / procedures.

---

# Instructions on running

the solution is containerised using docker, and can be run with 'docker compose up' or 'docker compose up --build' is changes are needed