import { DownOutlined } from '@ant-design/icons'
import { Tree, TreeProps } from 'antd'
import { DataNode } from 'antd/es/tree'
import React from 'react'
import { useCookies } from 'react-cookie'
import { get } from '../Plugins/helpers'
import { CompaniesType } from '../types/globalTypes'

const TestComponent2 = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  const [cookies] = useCookies(['access_token'])
  const [companies, setCompanies] = React.useState<CompaniesType[]>()
  React.useEffect(() => {
    (async () => {
      try{
        const allComapnies = await get('getCompanies', cookies.access_token)
        const collocations = await get('getCollocations', cookies.access_token)
        setCompanies(allComapnies.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])
  console.log(companies)
  const treeCompanies = companies?.map((el, i) => {
    const childCompanies = companies.filter((ele) => ele.parentCompanyId === el.id)
    return{
      key:      el.id,
      children: childCompanies.map((elem, index) => {

        return{
          title: elem.companyInfo.companyName,
          key:   `${i+1} - ${index}`,
        }
      }),

    }
  })

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={treeCompanies}
    />
  )
}

export default TestComponent2