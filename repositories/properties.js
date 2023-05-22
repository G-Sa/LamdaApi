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
    .catch((err) => console.error('connection error', err.stack))


const getProperties = async () => {
  let response = await client.query('SELECT * FROM properties ORDER BY id ASC')
  return response.rows;
}

const getPropertyById = async (id) => {  
  let response = await client.query('SELECT * FROM properties WHERE id = $1', [id])
  return response.rows;
}

const createProperty = async (property) => {
  const { owner, address, city, state, zip_code} = property;
  let response =  await client.query('INSERT INTO properties (owner, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [owner, address, city, state, zip_code])
  return response.rows[0];
}

const updateProperty = async (id, property) => {
  const { owner, address, city, state, zip_code} = property
  let response = await client.query('UPDATE properties SET owner = $1, address = $2, city = $3, state = $4, zip_code = $5 WHERE id = $6 RETURNING *',
    [owner, address, city, state, zip_code, id]);
  return response.rows[0];
}

const deleteProperty = async (id) => {
  let response = await client.query('DELETE FROM properties WHERE id = $1 RETURNING *', [id])  
  return response.rows[0];
}

export default {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
}
