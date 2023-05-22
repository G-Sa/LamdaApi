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

const getProperties = async () => {
  client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))
  // console.log (await client.query('SELECT NOW()'));

  console.log(await client.query('SELECT * FROM properties ORDER BY id ASC'));

  // console.log('getProperties')
  //   pool.query('SELECT NOW()', (err, result) => {
  //     if (err) {
  //       return console.error('Error executing query', err.stack)
  //     }
  //     console.log(result.rows)
  //   })

  //   pool.query('SELECT * FROM properties ORDER BY id ASC', (error, result) => {
  //       if (error) {
  //         throw error
  //       }
  //       console.log(result.rows)
  //       result.rows
  //     })
}

const getPropertyById = (id, results) => {  
    pool.query('SELECT * FROM properties WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      return results.rows
    })
}

const createProperty = (property, results) => {
    const { owner, address, city, state, zip_code} = property;
    let response;
    pool.query('INSERT INTO properties (owner, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5)',
     [owner, address, city, state, zip_code], (error, results) => {
        if (error) {
          throw error
        }
        console.log('results')
        console.log(results.rows[0])
        response = results.rows
      })
      console.log(response);
}

const updateProperty = (id, property, results) => {
    const { owner, address, city, state, zip_code} = property
  
    pool.query(
      'UPDATE properties SET owner = $1, address = $2, city = $3, state = $4, zip_code = $5 WHERE id = $6',
      [owner, address, city, state, zip_code, id],
      (error, results) => {
        if (error) {
          throw error
        }
        return results.rows
      }
    )
}

const deleteProperty = (id, results) => {  
    pool.query('DELETE FROM properties WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      return results.rows
    })
}

export default {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
}
