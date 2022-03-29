# Schedule Board Project

- This readme is a WiP:

This is a sister repo for https://github.com/AdrianValladaresDiaz/ScheduleBoard-Front. This serves as the backend for

## About

## Env

- JWT_SECRET: Secret key used for jwt token signatures
- MONGO_URI: URI of your mongo DB. This database should have 2 collections (shapes defined in src/database/models):

* users
* projects

- DEBUG: Debug setting. Leave as "SCHEDBORD:\*" to write everything to console or add specificity as desired.

# Enpoints (marked for changed soon, endpoints to be rearranged, auth to be extended to most endpoints)

- /ping:
  - all(/): If the request is received with a correct token, pongs back with a standard response {error: false, message: "pong"}
- /userProjects
  - get(/): If authenticated, the request gets project information for all of the user's projects.
  - post(/): If authenticated, requests here create new projects for the user matching the jwt token.
- /project
  - get(/): No auth required. Response is Project asn defined in the schemas.
  - post(/createTaskList): Auth required: Creates a taskList in the specified project
- /deleteTask
  - delete(/): Auth required, deletes a task by id
- /createTask
  - post(/): Creates a task, in the given taskList
- /task
  - get(/): Gets the Task object, requires the taskid and the project id of the projectit belongs to
  - put(/): Updates a given task, requires the taskid and the project id of the projectit belongs to
- /authentication
  - post(/register): Gets user data and adds it to the database. Users are identified by mail.
  - post(/login): Gets user mail and password, and returns a jwt token if the info matches the database.

## /project:

Request should have a 'projectId' property in the body. This endpoint returns that project from the mongo DB.

# Middlewares

## auth:

Checks request headers for "authorization" and calls next if jwt token can be verified. Calls next(error) otherwise
