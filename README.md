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

## Complex filter

1. $eq: equality operator

- db.products.find({category: {$eq: "Monitors"}})

2. $ne: Not equal operator

- db.products.find({category: {$ne: "Monitors"}})

3. $gt/$gte: greater than / greater than equal operator

- db.products.find({price: {$gt: 3000}})

4. $lt/$lte: less than / less than equal operator
5. $in
6. $and
7. $or
8. $not

### Sorting

- db.products.find().sort({price: 1})
  - 1: asc
  - -1: desc

### Limit

- db.products.find().limit(2)

### Skip

- db.products.find().skip(2)

# Mongoose

- ODM of MongoDb for Node.js
- Schema validation
- Models
- Middlewares
- Relationships

## Schema

- Structure/rule of a document/data

## Model

- Class built from schema, interact with the database
- Semantics: Always singular, Pascal case
- for e.g: Product

### Product Order
1. User id
2. Product Items
  a. product id
  b. quantity
3. Status
4. Order number
5. Total price
6. Shipping address

## Encryption

- Convering normal readable text into cipher (unreadable) text.
- for e.g: hello => 282uncjcb82dyhdh8dh

- Decryption: Converting cipher text to readable form

### Types

1. Symmetric: Same key is used for encryption and decryption

2. Asymmetric: Different keys are used for encryption and decryption. (private and public key), RSA algorithm

## Hashing

- Type of encryption, this is one way encryption

## Salt

- Adding random texts in the hash value

## Auth

1. Login success
2. Token generated
3. Store token (cookie, session and local)
4. Append this token in every requests to handle auth

## JWT - JSON Web Token

- Used for auth
- Self verified
- Temper-proof

### Structure

1. Header
2. Payload
3. Signature

## Cookie

- Can be stored in both server and browser
- Size: 4KB
- Expiry date can be set
- Available in all tabs

## Session Storage

- Can be stored only in browser
- Size: 5MB
- Expires on tab close
- Available in one tab

## Local storage

- Can be stored only in browser
- Size: 5MB - 10MB
- Never expires
- Available in all tabs

# Middlewares

- Function that remains between request and response
- It has accessibility of both request and response object
- It has functionality to go to next() function call

## Usage

- Logging
- Authentication and Authorization
- Error handling
- Modify request data

# RBAC - Role Based Access Control
- Single role: Access hierarchy
- Multiple roles: