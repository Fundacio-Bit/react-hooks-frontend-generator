import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { StringForm } from './components/StringForm'

const useStyles = makeStyles(theme => ({
  formSection: {
    padding: theme.spacing(2)
  }
}))

export const FormsBody = ({ fields, itemValues, setItemValues, validationStatuses }) => {
  const classes = useStyles()

  const primaryKeyField = fields.filter(x => x.isPrimaryKey).map(x => x.fieldName)[0]

  const handleChange = (fieldName, value) => {
    setItemValues({...itemValues, [fieldName]: value })
  }

  const generateForms = () => {
    let forms = []

    fields.forEach((field, index) => {
      forms.push(
        <StringForm
          key={index}
          disabled={(field.isPrimaryKey || (field.notEditable && itemValues[primaryKeyField] !== 'new')) ? true : false}
          name={field.fieldName}
          label={field.label}
          value={itemValues[field.fieldName]}
          error={validationStatuses[field.fieldName].error}
          errorMessage={validationStatuses[field.fieldName].message}
          onChange={(e) => { handleChange(field.fieldName, e.target.value) }}
          onBlur={() => {}}
        />
      )
    })

    return forms
  }

  return (
    <div className={classes.formSection}>
      {generateForms()}
    </div>
  )
}
