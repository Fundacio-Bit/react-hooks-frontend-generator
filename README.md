# react-hooks-frontend-generator #

A generator of front-ends based on React Hooks and JSON Schema.

You can configure a REST API endpoint and the item fields of the API as columns to generate a UI that contains a table of items with CRUD options.

## Installation

~~~
npm install
~~~

## Configuration

### 1. Define the App configuration schema in *src/app-config.js*
~~~javascript
export const enableLogin = false

export const login = {
  endpoint: 'http://127.0.0.1:5000/login',
  fields: {
    username: 'username',
    password: 'pwd'
  }
}

export const appSchema = [
    {
      resourceId: 'products',
      resourceTabLabel: 'Productos',
      restEndpoint: 'http://127.0.0.1:5000/products',
      columns: [
        {
          fieldName: '_id',
          label: '_id',
          schema: { type: 'string' },
          isPrimaryKey: true
        },
        {
          fieldName: 'product_id',
          label: 'Id producto',
          schema: { type: 'string' },
          notEditable: true
        },
        {
          fieldName: 'name',
          label: 'Nombre',
          schema: { type: 'string' }
        },
        {
          fieldName: 'price',
          label: 'Precio (€)',
          schema: {
            type: 'number',
            minimum: 4.99
          }
        },
        {
          fieldName: 'supplier_id',
          label: 'Proveedor',
          schema: { type: 'string' },
          isForeignKey: {
            endpoint: 'http://127.0.0.1:5000/suppliers',
            idField: 'supplier_id',
            shownFields: ['name', 'supplier_id']
          }
        },
        {
          fieldName: 'available_colors',
          label: 'Colores disponibles',
          schema: {
            type: "array",
            items: {
              type: "string",
              enum: ["red", "blue", "green", "yellow", "black", "white"]
            },
            uniqueItems: true
          }
        }
      ]
    }
]
~~~

## Usage

~~~
npm start
~~~
