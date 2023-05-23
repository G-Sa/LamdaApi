import pkg from 'pg';
import { config } from 'dotenv';
config();
const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
client.connect()
  .catch((err) => {
    throw new Error('Connection error: ' + err.stack);
  });

const getProperties = async () => {
  try {
    let response = await client.query('SELECT * FROM properties ORDER BY id ASC');
    return response.rows;
  } catch (error) {
    throw new Error('Failed to get properties: ' + error.message);
  }
}

const getPropertyById = async (id) => {
  try {
    let response = await client.query('SELECT * FROM properties WHERE id = $1', [id]);
    return response.rows;
  } catch (error) {
    throw new Error('Failed to get property by ID: ' + error.message);
  }
}

const createProperty = async (property) => {
  try {
    const { owner, address, city, state, zip_code } = property;
    let response = await client.query('INSERT INTO properties (owner, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [owner, address, city, state, zip_code]);
    return response.rows[0];
  } catch (error) {
    throw new Error('Failed to create property: ' + error.message);
  }
}

const updateProperty = async (id, property) => {
  try {
    const { owner, address, city, state, zip_code } = property;
    let response = await client.query('UPDATE properties SET owner = $1, address = $2, city = $3, state = $4, zip_code = $5 WHERE id = $6 RETURNING *',
      [owner, address, city, state, zip_code, id]);
    return response.rows[0];
  } catch (error) {
    throw new Error('Failed to update property: ' + error.message);
  }
}

const deleteProperty = async (id) => {
  try {
    let response = await client.query('DELETE FROM properties WHERE id = $1 RETURNING *', [id]);
    return response.rows[0];
  } catch (error) {
    throw new Error('Failed to delete property: ' + error.message);
  }
}

export default {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
