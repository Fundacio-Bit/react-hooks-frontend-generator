import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { appSchema } from '../app-config'
import { ResourceTab } from './resource/ResourceTab'
import Ajv from 'ajv'

const ajv = new Ajv({ allErrors: true })

// Compiling schemas of columns
// -----------------------------
appSchema.forEach(resource => {
  resource.columns.forEach(column => {
    try {
      column.validate = ajv.compile(column.schema)
    } catch(error) {
      console.log(`Problem detected compiling the schema: ${resource.resourceId} / ${column.fieldName}`)
    }
  })
})

export const AppContainer = () => {

  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <AppBar position="relative" color="default">
        <Tabs value={activeTab} onChange={(event, value) => { setActiveTab(value) }}>
          {appSchema.map(resource => (
            <Tab
              key={resource.resourceId}
              label={resource.resourceTabLabel}
              style={{ fontSize: 12 }}
            />
          ))}
        </Tabs>
      </AppBar>
      {appSchema.map((resource, index) => (
        activeTab === index &&
          <ResourceTab
            key={index}
            restEndpoint={resource.restEndpoint}
            columns={resource.columns}
          />
      ))}
    </div>
  )
}
