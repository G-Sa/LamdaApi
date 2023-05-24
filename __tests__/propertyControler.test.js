import {
    listProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
  } from '../controllers/propertyController';
  
  import propertyRepo from '../repositories/properties';
  import Property from '../models/property';
  
  jest.mock('../repositories/properties'); // Mock the propertyRepo module
  
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  const mockPropertyJson = {
    owner: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip_code: '12345'
  }

  const mockProperty = new Property('John Doe', '123 Main St', 'New York', 'NY', '12345');
  
  const createRequest = (params = {}, body = {}) => ({
    params,
    body
  });
  
  describe('Property Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('listProperties', () => {
      test('should return list of properties', async () => {
        const mockProperties = [
          {
            id: 1,
            owner: 'John Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip_code: '12345'
          }
        ];
        propertyRepo.getProperties.mockResolvedValueOnce(mockProperties);
  
        const request = createRequest();
        
        await listProperties(request, mockResponse);
  
        expect(propertyRepo.getProperties).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockProperties);
      });
  
      test('should handle error', async () => {
        const errorMessage = 'Database error';
        propertyRepo.getProperties.mockRejectedValueOnce(new Error(errorMessage));
  
        const request = createRequest();
        
        await listProperties(request, mockResponse);
  
        expect(propertyRepo.getProperties).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  
    describe('getPropertyById', () => {
      test('should return property by id', async () => {
        const mockProperty = {
          id: 1,
          owner: 'John Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip_code: '12345'
        };
        propertyRepo.getPropertyById.mockResolvedValueOnce(mockProperty);
  
        const request = createRequest({id: 1});
        
        await getPropertyById(request, mockResponse);
  
        expect(propertyRepo.getPropertyById).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockProperty);
      });

      test('should not find property by id', async () => {
        propertyRepo.getPropertyById.mockResolvedValueOnce([]);
  
        const request = createRequest({id: 0});
        
        await getPropertyById(request, mockResponse);
  
        expect(propertyRepo.getPropertyById).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Property not found' });
      });

      test('should handle error', async () => {
        const errorMessage = 'Database error';
        propertyRepo.getPropertyById.mockRejectedValueOnce(new Error(errorMessage));
  
        const request = createRequest({id: 1});
        
        await getPropertyById(request, mockResponse);
  
        expect(propertyRepo.getPropertyById).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
    
    describe('createProperty', () => {
      test('should create a property ', async () => {
        const mockResult = { id: 1 };
        propertyRepo.createProperty.mockResolvedValueOnce(mockResult);
    
        const request = createRequest( {}, mockPropertyJson);
    
        await createProperty(request, mockResponse);
    
        expect(propertyRepo.createProperty).toHaveBeenCalledWith(mockProperty);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    
      test('should handle missing parameters', async () => {
        const request = createRequest({});
    
        await createProperty(request, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Missing parameters' });
      });
    
      test('should handle database error', async () => {
        const errorMessage = 'Database error';
        propertyRepo.createProperty.mockRejectedValueOnce(new Error(errorMessage));
    
        const request = createRequest( {}, mockProperty);
    
        await createProperty(request, mockResponse);
    
        expect(propertyRepo.createProperty).toHaveBeenCalledWith(mockProperty);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('updateProperty', () => {   
      test('should update a property and return success response', async () => {
        const mockId = 1;
        const mockResult = { id: 1 };
        propertyRepo.updateProperty.mockResolvedValueOnce(mockResult);
    
        const request = createRequest({ id: mockId }, mockPropertyJson);
    
        await updateProperty(request, mockResponse);
    
        expect(propertyRepo.updateProperty).toHaveBeenCalledWith(mockId, mockProperty);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    
      test('should handle invalid ID and return error response', async () => {
        const request = createRequest({ id: 'abc' });
    
        await updateProperty(request, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid ID' });
      });
    
      test('should handle missing parameters and return error response', async () => {
        const request = createRequest({ id: 1 }, {});
    
        await updateProperty(request, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Missing parameters' });
      });
    
      test('should handle property not found and return error response', async () => {
        const mockId = 0;
        const request = createRequest({ id: mockId }, mockPropertyJson);
        propertyRepo.updateProperty.mockResolvedValueOnce([]);
    
        await updateProperty(request, mockResponse);
    
        expect(propertyRepo.updateProperty).toHaveBeenCalledWith(mockId, mockProperty);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Property not found' });
      });
    
      test('should handle database error and return error response', async () => {
        const mockId = 1;
        const mockProperty = new Property('John Doe', '123 Main St', 'New York', 'NY', '12345');
        const errorMessage = 'Database error';
        propertyRepo.updateProperty.mockRejectedValueOnce(new Error(errorMessage));
    
        const request = createRequest({ id: mockId }, mockProperty);
    
        await updateProperty(request, mockResponse);
    
        expect(propertyRepo.updateProperty).toHaveBeenCalledWith(mockId, mockProperty);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

    describe('deleteProperty', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
    
      test('should delete a property and return success response', async () => {
        const mockId = 1;
        const mockResult = { id: 1 };
        propertyRepo.deleteProperty.mockResolvedValueOnce(mockResult);
    
        const request = createRequest({ id: mockId });
    
        await deleteProperty(request, mockResponse);
    
        expect(propertyRepo.deleteProperty).toHaveBeenCalledWith(mockId);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    
      test('should handle invalid ID and return error response', async () => {
        const request = createRequest({ id: 'abc' });
    
        await deleteProperty(request, mockResponse);
    
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid ID' });
      });
    
      test('should handle property not found and return error response', async () => {
        const mockId = 0;
        const request = createRequest({ id: mockId });
        propertyRepo.deleteProperty.mockResolvedValueOnce([]);
    
        await deleteProperty(request, mockResponse);
    
        expect(propertyRepo.deleteProperty).toHaveBeenCalledWith(mockId);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Property not found' });
      });
    
      test('should handle database error and return error response', async () => {
        const mockId = 1;
        const errorMessage = 'Database error';
        propertyRepo.deleteProperty.mockRejectedValueOnce(new Error(errorMessage));
    
        const request = createRequest({ id: mockId });
    
        await deleteProperty(request, mockResponse);
    
        expect(propertyRepo.deleteProperty).toHaveBeenCalledWith(mockId);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });

});
  