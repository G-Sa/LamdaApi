import propertyRepo from '../repositories/properties.js'
import Property from '../models/property.js'

export const listProperties = async (request, response) => {
  try {
    const list = await propertyRepo.getProperties()
    return response.status(200).json(list)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

export const getPropertyById = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    if (isNaN(id)) {
      return response.status(400).json({ error: 'Invalid ID' })
    }
    const result = await propertyRepo.getPropertyById(id)
    if (result.length === 0) {
      return response.status(404).json({ error: 'Property not found' })
    }
    return response.status(200).json(result)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

export const createProperty = async (request, response) => {
  try {
    const { owner, address, city, state, zip_code } = request.body;
    if (!owner || !address || !city || !state || !zip_code) {
      return response.status(400).json({ error: 'Missing parameters' })
    }
    const property = new Property(owner, address, city, state, zip_code)
    const result = await propertyRepo.createProperty(property)
    return response.status(201).send(`Property added with ID: ${result.id}`)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

export const updateProperty = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    if (isNaN(id)) {
      return response.status(400).json({ error: 'Invalid ID' })
    }
    const { owner, address, city, state, zip_code } = request.body;
    if (!owner || !address || !city || !state || !zip_code) {
      return response.status(400).json({ error: 'Missing parameters' })
    }
    const property = new Property(owner, address, city, state, zip_code)
    const result = await propertyRepo.updateProperty(id, property)
    if (result.length === 0) {
      return response.status(404).json({ error: 'Property not found' })
    }
    return response.status(200).send(`Property modified with ID: ${result.id}`)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

export const deleteProperty = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    if (isNaN(id)) {
      return response.status(400).json({ error: 'Invalid ID' })
    }
    const result = await propertyRepo.deleteProperty(id)
    if (result.length === 0) {
      return response.status(404).json({ error: 'Property not found' })
    }
    return response.status(200).send(`Property deleted with ID: ${result.id}`)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}
