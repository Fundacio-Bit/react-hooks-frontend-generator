export const loginEndpoint = 'http://127.0.0.1:5000/login'

export const appSchema = [
    {
      resource: 'products',
      tabLabel: 'Productos',
      endpoints: {
        get: 'http://127.0.0.1:5000/products',
        post: 'http://127.0.0.1:5000/products',
        put: 'http://127.0.0.1:5000/products/<id>',
        patch: 'http://127.0.0.1:5000/products/<id>',
        delete: 'http://127.0.0.1:5000/products/<id>'
      },
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
