export const loginEndpoint = 'http://127.0.0.1:5000/login'

export const appSchema = [
    {
      resource: 'products',
      tabLabel: 'Productos',
      endpoints: {
        get: 'http://127.0.0.1:5000/products',
        post: 'http://127.0.0.1:5000/products',
        put: 'http://127.0.0.1:5000/products/:_id',
        patch: 'http://127.0.0.1:5000/products/:_id',
        delete: 'http://127.0.0.1:5000/products/:_id'
      },
      columns: [
        {
          fieldName: 'name',
          label: 'Nombre',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        },
        {
          fieldName: 'product_id',
          label: 'Id',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        },
        {
          fieldName: 'price',
          label: 'Precio (€)',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        },
        {
          fieldName: 'supplier_id',
          label: 'Proveedor',
          type: String,
          cellType: 'StringCell',
          formType: 'StringForm'
        }
      ]
    }
]
