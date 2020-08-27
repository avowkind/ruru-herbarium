import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
 
export default () => (
  <Tabs >
    <TabList>
      <Tab>Notes</Tab>
      <Tab>Planting</Tab>
      <Tab>Maintenance</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
)
