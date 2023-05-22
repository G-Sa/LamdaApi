# Lambda API

## Description

This is a JavaScript project that provides an API with CRUD operations for managing properties. It utilizes Node.js 18, Express Framework, Serverless Framework, and Postgres as the database.

The API allows users to perform Create, Read, Update, and Delete (CRUD) operations on property data. Each property has the following fields:

- **owner**: The owner of the property.
- **address**: The address of the property.
- **city**: The city where the property is located.
- **state**: The state where the property is located.
- **zip_code**: The zip code of the property.

## Prerequisites

To run this project, you need to have the following software installed:

- Node.js 18: [Download and Install Node.js](https://nodejs.org/)
- Serverless Framework: [Install Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- PostgreSQL: [Install PostgreSQL](https://www.postgresql.org/download/)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/G-Sa/LamdaApi.git
   ```

2. Change to the project directory:

   ```shell
   cd LambdaApi
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the PostgreSQL database:

   - Create a new database for the project.
   - Create a .env file on the root of the project, it should have these informations
   ```
        DB_USER:
        DB_HOST:
        DB_DATABASE:
        DB_PASSWORD:
        DB_PORT:
   ```

5. Start the server locally:

   ```shell
   sls offline
   ```

6. The server should now be running locally. You can access the API endpoints using the following URL:

   ```
   http://localhost:3000
   ```

## Usage

The API provides the following endpoints for managing properties:

- `GET /properties`: Get a list of all properties.
- `GET /properties/:id`: Get a specific property by its ID.
- `POST /properties`: Create a new property.
- `PUT /properties/:id`: Update an existing property.
- `DELETE /properties/:id`: Delete a property.

To interact with the API, you can use tools like cURL or Postman. Make HTTP requests to the appropriate endpoints and include the necessary data in the request body or URL parameters.

## Deployment

This project is designed to be deployed using the Serverless Framework. To deploy the project to a cloud provider, such as AWS Lambda, follow these steps:

1. Set up your cloud provider credentials. Refer to the Serverless Framework documentation for detailed instructions.

2. Update the Serverless configuration file (`serverless.yml`) with your desired deployment settings, such as service name, region, and stage.

3. Deploy the project using the Serverless CLI:

   ```shell
   serverless deploy
   ```

   This will package and deploy the project to your cloud provider.

4. Once the deployment is complete, you will receive the endpoint URL where the API is accessible.


