import propertyRepo from '../repositories/properties.js'
import Property from '../models/property.js'

export const listProperties = async (request, response) => {
  const list = await propertyRepo.getProperties(request, response)
  return response.status(200).json(list)
}

export const getPropertyById = (request, response) => {
  const id = parseInt(request.params.id)
  propertyRepo.getPropertyById(id, response)
  return response.status(200).json(results.rows)
}

export const createProperty = (request, response) => {
  const { owner, address, city, state, zip_code} = request.body;
  const property = new Property(owner, address, city, state, zip_code)
  const result = propertyRepo.createProperty(property, response)
  console.log(result)
  return response.status(201).send(`Property added with ID: ${result.insertId}`)
}

export const updateProperty = (request, response) => {
  const id = parseInt(request.params.id)
  const { owner, address, city, state, zip_code} = request.body;
  const property = new Property(owner, address, city, state, zip_code)
  propertyRepo.updateProperty(id, property, response)
  return response.status(200).send(`Property modified with ID: ${id}`)
}

export const deleteProperty = (request, response) => {
  const id = parseInt(request.params.id)
  propertyRepo.deleteProperty(id, response)
  return response.status(200).send(`Property deleted with ID: ${id}`)
}