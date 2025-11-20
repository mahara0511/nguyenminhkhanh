export const productSwagger = {
  '/v1/products': {
    get: {
      tags: ['Products'],
      summary: 'Get list of products with search, pagination and sorting',
      parameters: [
        {
          in: 'query',
          name: 'search',
          schema: { type: 'string' },
          example: 'Laptop',
          description: 'Search by product name',
        },
        {
          in: 'query',
          name: 'sortBy',
          schema: { type: 'string', default: 'createdAt' },
          example: 'price',
        },
        {
          in: 'query',
          name: 'order',
          schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
          example: 'asc',
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 },
          example: 1,
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 20 },
          example: 10,
        },
      ],
      responses: {
        200: {
          description: 'List of products',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Products fetched successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      items: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Product' },
                      },
                      meta: {
                        type: 'object',
                        properties: {
                          total: { type: 'number', example: 42 },
                          page: { type: 'number', example: 1 },
                          limit: { type: 'number', example: 10 },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                message: 'Products fetched successfully',
                data: {
                  items: [
                    {
                      id: 1,
                      name: 'Laptop ASUS TUF',
                      description: 'High performance gaming laptop',
                      price: '1899.99',
                      stock: 20,
                      category: 'Electronics',
                      imageUrl: 'https://example.com/tuf.png',
                      createdAt: '2025-11-20T14:05:30.000Z',
                      updatedAt: '2025-11-20T14:05:30.000Z',
                    },
                  ],
                  meta: {
                    total: 1,
                    page: 1,
                    limit: 10,
                  },
                },
              },
            },
          },
        },
      },
    },

    post: {
      tags: ['Products'],
      summary: 'Create a new product',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ProductCreateDto' },
            example: {
              name: 'iPhone 15',
              description: 'Latest Apple smartphone',
              price: '999.00',
              stock: 50,
              category: 'Mobile',
              imageUrl: 'https://example.com/iphone15.png',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Product created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/Product' },
                },
              },
              example: {
                message: 'Product created successfully',
                data: {
                  id: 100,
                  name: 'iPhone 15',
                  description: 'Latest Apple smartphone',
                  price: '999.00',
                  stock: 50,
                  category: 'Mobile',
                  imageUrl: 'https://example.com/iphone15.png',
                  createdAt: '2025-11-20T14:05:30.000Z',
                  updatedAt: '2025-11-20T14:05:30.000Z',
                },
              },
            },
          },
        },
      },
    },
  },

  '/v1/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Get product by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      responses: {
        200: {
          description: 'Product found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/Product' },
                },
              },
              example: {
                message: 'Product fetched successfully',
                data: {
                  id: 1,
                  name: 'Laptop ASUS TUF',
                  description: 'High performance gaming laptop',
                  price: '1899.99',
                  stock: 20,
                  category: 'Electronics',
                  imageUrl: 'https://example.com/tuf.png',
                  createdAt: '2025-11-20T14:05:30.000Z',
                  updatedAt: '2025-11-20T14:05:30.000Z',
                },
              },
            },
          },
        },
        404: { description: 'Product not found' },
      },
    },

    patch: {
      tags: ['Products'],
      summary: 'Update product by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ProductUpdateDto' },
            example: {
              price: '899.99',
              stock: 10,
              category: 'Electronics',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Product updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/Product' },
                },
              },
              example: {
                message: 'Product updated successfully',
                data: {
                  id: 1,
                  name: 'Laptop ASUS TUF',
                  description: 'High performance gaming laptop',
                  price: '899.99',
                  stock: 10,
                  category: 'Electronics',
                  imageUrl: 'https://example.com/tuf.png',
                  createdAt: '2025-11-20T14:05:30.000Z',
                  updatedAt: '2025-11-20T14:07:12.000Z',
                },
              },
            },
          },
        },
      },
    },

    delete: {
      tags: ['Products'],
      summary: 'Delete product by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      responses: {
        200: {
          description: 'Product deleted successfully',
          content: {
            'application/json': {
              example: {
                message: 'Product deleted successfully',
                data: null,
              },
            },
          },
        },
        404: { description: 'Product not found' },
      },
    },
  },
};

export const productSchemas = {
  Product: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Laptop ASUS TUF' },
      description: { type: 'string', nullable: true, example: 'Gaming laptop' },
      price: { type: 'string', example: '1899.99' },
      stock: { type: 'number', example: 20 },
      category: { type: 'string', nullable: true, example: 'Electronics' },
      imageUrl: {
        type: 'string',
        nullable: true,
        example: 'https://example.com/tuf.png',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-11-20T14:05:30.000Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-11-20T14:05:30.000Z',
      },
    },
  },

  ProductCreateDto: {
    type: 'object',
    required: ['name', 'price', 'stock'],
    properties: {
      name: { type: 'string', example: 'iPhone 15' },
      description: {
        type: 'string',
        nullable: true,
        example: 'Apple smartphone',
      },
      price: { type: 'string', example: '999.00' },
      stock: { type: 'number', example: 50 },
      category: { type: 'string', example: 'Mobile' },
      imageUrl: {
        type: 'string',
        nullable: true,
        example: 'https://example.com/iphone15.png',
      },
    },
  },

  ProductUpdateDto: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Laptop MSI GF65' },
      description: { type: 'string', example: 'Upgraded model' },
      price: { type: 'string', example: '1499.99' },
      stock: { type: 'number', example: 15 },
      category: { type: 'string', example: 'Electronics' },
      imageUrl: {
        type: 'string',
        nullable: true,
        example: 'https://example.com/msi.png',
      },
    },
  },
};
