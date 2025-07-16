# MERN Stack Ecommerce Website

## Folder Structure

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

## JSON Data

- Javascript Object Notation
- Text based structured Data
- Most common format used in APIs
- JSON to JS Object -> JSON.parse()
- JS Object to JSON -> JSON.stringify()

## REST API

- Representational State Transfer
  - JSON based Data
  - HTTP methods
- Application Programming Interface

### Cases

1. Sentence case: Hello world
2. Camel case: helloWorld
3. Pascal case: HelloWorld
4. Kebab case: hello-world
5. Snake case: hello_world

### DRY Technique: Don't Repeat Yourself

## Layered Architecture

1. Presentation layer
2. API layer

- Route: URL Endpoint
- Controller: Function that handles HTTP request, response, status codes, Dumb function: no computation

3. Business logic layer

- Service: Function that handles pure business logic, computation
- Service methods/functions can communicate with each other

4. Data access layer

- Models and Repositories
- Schemas
- SQL
