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

## Import/Export

## Request Object

- params
- query
- body
- file

## Logging

## MongoDB
- Non-Relational Database
- Data are stored in collections & documents
- Collection: Table
- Document: Rows
- Field: columns

### MongoDB Tools
1. Shell - Terminal
2. Compass - Local GUI
3. Atlas - Cloud

### MongoDB Shell Commands
1. mongosh: init mongodb 
2. show dbs: Show database list 
3. use: Use a database
4. cls: Clear screen
5. show collections: Show list of collections (table)

**Create**
1. insertOne
- db.<collectionName>.insertOne()
- for e.g: db.products.insertOne({name: "Iphone 14", price: 100000})

2. inertMany
- db.<collectionName>.inertMany()
- for e.g: db.products.insertMany([])

**Read**
1. find
- db.<collectionName>.find()
- for e.g: db.products.find({category: "Monitors"})

2. findOne
- db.<collectionName>.findOne()
- for e.g: db.products.findOne({name: "Iphone 14"})

3. countDocuments
- db.<collectionName>.countDocuments()
- for e.g: db.products.countDocuments()

**Update**
1. updateOne
- db.<collectionName>.updateOne({find}, {$set: {update value}})
- for e.g: db.products.updateOne({name: "Iphone 14"}, {$set: {name: "Iphone 14 Promax"}})

**Delete**
1. deleteOne
- db.<collectionName>.deleteOne({find})
- for e.g: db.products.deleteOne({name: "Iphone 14 Pro max"})