import propertyRepo from '../repositories/properties.js'
import Property from '../models/property.js'

export const listProperties = async (request, response) => {
  const list = await propertyRepo.getProperties()
  return response.status(200).json(list)
}

export const getPropertyById = async (request, response) => {
  const id = parseInt(request.params.id)
  const result = await propertyRepo.getPropertyById(id)
  return response.status(200).json(result)
}

export const createProperty = async (request, response) => {
  const { owner, address, city, state, zip_code} = request.body;
  const property = new Property(owner, address, city, state, zip_code)
  const result = await propertyRepo.createProperty(property)
  return response.status(201).send(`Property added with ID: ${result.id}`)
}

export const updateProperty = async (request, response) => {
  const id = parseInt(request.params.id)
  const { owner, address, city, state, zip_code} = request.body;
  const property = new Property(owner, address, city, state, zip_code)
  const result = await propertyRepo.updateProperty(id, property)
  return response.status(200).send(`Property modified with ID: ${result.id}`)
}

export const deleteProperty = async (request, response) => {
  const id = parseInt(request.params.id)
  const result = await propertyRepo.deleteProperty(id, response)
  return response.status(200).send(`Property deleted with ID: ${result.id}`)
}