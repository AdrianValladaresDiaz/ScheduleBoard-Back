# Schedule Board Project

## About

# Enpoints

## /project:

Request should have a 'projectId' property in the body. This endpoint returns that project from the mongo DB.

# Middlewares

## auth:

Checks request headers for "authorization" and calls next if jwt token can be verified. Calls next(error) otherwise
