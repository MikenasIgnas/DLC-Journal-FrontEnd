/* eslint-disable max-len */
import { DownOutlined }         from '@ant-design/icons'
import { ConfigProvider, Tree } from 'antd'
import React                    from 'react'
import { Link }                 from 'react-router-dom'
import { CompaniesType }        from '../../../types/globalTypes'
import HighlightText            from '../../UniversalComponents/HighlightText'

type ChildCompaniesTreeProps = {
    item:         CompaniesType
    companies:    CompaniesType[]
    searchValue:  string | null
}

const ChildCompaniesTree = ({companies, item, searchValue}: ChildCompaniesTreeProps) => {
  const treeCompanies = companies?.map((el, i) => {
    const childCompanies = companies.filter((ele) => ele.parentCompanyId === el.id)
    return{
      title:    <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${el.id}`}>{el.companyInfo.companyName}</Link>,
      key:      el.id,
      children: childCompanies.map((elem, index) => {
        return{
          title: <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${elem.id}`}>{el.companyInfo.companyName}</Link>,
          key:   `${i+1} - ${index}`,
        }
      }),
    }
  })

  const filter = treeCompanies.filter((el) => el.key === item.id)
  const hasChildren = filter[0].children.length >= 1
  return (
    <>
      {hasChildren ?
        <ConfigProvider theme={{ token: { colorBgContainer: 'none' } }}>
          <Tree
            showLine
            switcherIcon={<DownOutlined rev='' />}
            defaultExpandedKeys={['0-0-0']}
            treeData={filter} />
        </ConfigProvider>
        : <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${item.id}`}>{HighlightText(searchValue, item.companyInfo.companyName)}</Link>}
    </>
  )
}

export default ChildCompaniesTree