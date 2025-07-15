# Nodejs

- It is a Javascript runtime.
- Runtime: It is program that runs another program
- helps torun JS in local machine, laptop, server
- build using c++
- uses Google chrome V8 engine for compiling
- used to build APIs, microservices, server-side programs, CLI

## Architecture

- single threaded event driven architecture.
- Non-blocking I/O Operations.

## HTTP Methods

1. GET: Read, used for fetching data
2. POST: Create, used to add/create a new data
3. PUT: Update, used to update existing data
4. DELETE: Delete, used to delete a data
5. PATCH (Optional): Partial update

## HTTP Status Codes

1. 100 range : Information response
2. 200 range : Success response
   - 200: Ok
   - 201: Created
3. 300 range : Redirection responses
4. 400 range : Client/User error response
   - 400: Bad request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not found
   - 405: Method not allowed
   - 409: Conflict
   - 422: Unprocessable entity
5. 500 range : Server error
   - 500: Internal server error
   - 502: Bad gateway
   - 504: Timeout

## Semantic Coding

1. Files and folders structure
2. Files and folders naming
3. Function and variable naming

## API Folder Structure

root/

- package.json
- .env
- .env.example
- .gitignore
- node_moduels/
- src/
  - server.js
  - app.js
  - routes/
  - controllers/
  - models/
  - services/
  - constants/
  - lib/
  - utils/
  - helpers/
