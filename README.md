# react-hooks-frontend-generator #

A generator of FrontEnds based on React Hooks.

## Installation

~~~
npm install
~~~

## Configuration

### 1. Define the App configuration schema in *src/app-config.js*
~~~javascript
export const loginEndpoint = 'http://127.0.0.1:5000/login'

export const appSchema = [
    {
      resource: 'products',
      tabLabel: 'Productos',
      restEndpoint: 'http://127.0.0.1:5000/products',
      columns: [
        {
          fieldName: '_id',
          label: '_id',
          isPrimaryKey: true,
          type: String,
          cellComponent: 'StringCell',
          formComponent: 'StringFormDisabled'
        },
        {
          fieldName: 'name',
          label: 'Nombre',
          type: String,
          cellComponent: 'StringCell',
          formComponent: 'StringForm'
        },
        {
          fieldName: 'product_id',
          label: 'Id producto',
          type: String,
          cellComponent: 'StringCell',
          formComponent: 'StringForm'
        },
        {
          fieldName: 'price',
          label: 'Precio (€)',
          type: String,
          cellComponent: 'StringCell',
          formComponent: 'StringForm'
        },
        {
          fieldName: 'supplier_id',
          label: 'Proveedor',
          type: String,
          cellComponent: 'StringCell',
          formComponent: 'SelectForm',
          isForeignKey: {
            referencedKey: 'supplier_id',
            endpoints: {
              get: 'http://127.0.0.1:5000/suppliers'
            }
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
