import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { appSchema } from '../app-config'
import { ResourceTab } from './resource/ResourceTab'

export const AppContainer = (props) => {

  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <AppBar position="relative" color="default">
        <Tabs value={activeTab} onChange={(event, value) => { setActiveTab(value) }}>
          {appSchema.map(resource => (
            <Tab
              key={resource.resource}
              label={resource.tabLabel}
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
