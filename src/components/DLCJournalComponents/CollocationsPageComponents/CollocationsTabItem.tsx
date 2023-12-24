/* eslint-disable max-len */
import React                from 'react'
import CollocationListItem  from './CollocationListItem'
import { Card, List }       from 'antd'

type MatchingCompaniesType = {
  companyName:  string;
  premiseName:  string;
  racks:        string[]
}

type CollocationsTabItemType = {
    site:       string,
    tabItemId:  number
    premises:   {
        premiseName: string;
        racks: string[];
    }[];
    companyCollocation: MatchingCompaniesType[] | undefined
}

const CollocationsTabItem = ({site, tabItemId, premises, companyCollocation}: CollocationsTabItemType) => {
  const item = {
    label: site,
    key:   String(tabItemId),
    children:
      <Card
        key={tabItemId}
        title={
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div>{site}</div>
          </div>}
      >
        <List
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
            <CollocationListItem item={item} index={i} companyCollocation={companyCollocation}/>
          )}
        />
      </Card>,
  }
  return item
}

export default CollocationsTabItem