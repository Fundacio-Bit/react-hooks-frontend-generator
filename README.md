# react-hooks-frontend-generator #

A generator of FrontEnds based on React Hooks.

## Installation

~~~
npm install
~~~

## Configuration

### 1. Define the App configuration schema in *src/app-config.js*
~~~
export const loginEndpoint = 'http://127.0.0.1:5000/login'

export const appSchema = [
    {
      resource: 'users',
      tabLabel: 'Usuarios',
      endpoints: {
        get: 'http://127.0.0.1:5000/api/users/id/--all--',
        post: 'http://127.0.0.1:5000/api/users',
        put: 'http://127.0.0.1:5000/api/users/id/:id',
        delete: 'http://127.0.0.1:5000/api/users/id/:id'
      },
      columns: [
        {
          fieldName: 'username',
          label: 'Usuario',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        },
        {
          fieldName: 'pwd',
          label: 'Contraseña',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        },
        {
          fieldName: 'email',
          label: 'Email',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        },
        {
          fieldName: 'ip_addresses',
          label: 'IP\'s',
          type: String,
          cellType: 'ArrayOfIpAddressesCell',
          formType: 'ArrayOfIpAddressesForm'
        },
        {
          fieldName: 'granted_islands',
          label: 'Islas',
          type: Array,
          cellType: 'ArrayOfChipsCell',
          formType: 'ArraySelectMultipleChipsForm',
          allowedValues: ['mallorca', 'menorca', 'ibiza', 'formentera']
        },
        {
          fieldName: 'granted_components',
          label: 'Componentes turísticos',
          type: Array,
          cellType: 'ArrayOfChipsCell',
          formType: 'ArraySelectMultipleChipsForm',
          allowedValues: ['rrtt', 'pla', 'iti', 'exp', 'art', 'eve', 'landing-slider', 'pub']
        },
        {
          fieldName: 'granted_methods',
          label: 'Métodos',
          type: Array,
          cellType: 'ArrayOfChipsCell',
          formType: 'ArraySelectMultipleChipsForm',
          allowedValues: ['GET', 'POST', 'PUT', 'DELETE']
        }
      ]
    }
]
~~~

## Usage

~~~
npm start
~~~
