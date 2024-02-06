/* eslint-disable max-len */
// import CollocationListItem  from './CollocationListItem'
import { Card }       from 'antd'


type CollocationsTabItemType = {
  name:   string
  id:     string
  key:    string
}

const CollocationsTabItem = ({name, id}: CollocationsTabItemType) => {
  const item = {
    label: name,
    key:   id,
    children:
      <Card
        key={name}
        title={
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div>{name}</div>
          </div>}
      >
        {/* <List
          grid={{
            gutter: 1,
            column: 5,
            xs:     1,
            sm:     2,
            md:     2,
            lg:     2,
            xl:     3,
            xxl:    3,
          }}
          bordered
          dataSource={premises}
          renderItem={(item, i) => (
            <CollocationListItem item={item} index={i}/>
          )}
        /> */}
      </Card>,
  }
  return item
}

export default CollocationsTabItem