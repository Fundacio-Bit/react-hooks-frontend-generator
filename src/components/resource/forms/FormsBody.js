import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { StringForm } from './components/StringForm'
import { SelectFromExternalSourceForm } from './components/SelectFromExternalSourceForm'

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
      if (field.isForeignKey) {
        forms.push(
          <SelectFromExternalSourceForm
            key={index}
            name={field.fieldName}
            label={field.label}
            value={itemValues[field.fieldName]}
            endpoint={field.isForeignKey.endpoint}
            idField={field.isForeignKey.idField}
            shownFields={field.isForeignKey.shownFields}
            error={false}
            onChange={(e) => { handleChange(field.fieldName, e.target.value) }}
          />
        )
      } else {
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
      }
    })

    return forms
  }

  return (
    <div className={classes.formSection}>
      {generateForms()}
    </div>
  )
}
