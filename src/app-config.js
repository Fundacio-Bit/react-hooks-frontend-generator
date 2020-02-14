export const enableLogin = true

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
        }
      ]
    }
]
