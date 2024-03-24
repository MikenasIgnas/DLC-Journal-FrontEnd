/* eslint-disable max-len */
import { DownOutlined }         from '@ant-design/icons'
import { ConfigProvider, Tree } from 'antd'
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
    const childCompanies = companies.filter((ele) => ele.parentId === el._id)
    return{
      title:    <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${el._id}?page=1&limit=10&tabKey=1`}>{el.name}</Link>,
      key:      el._id,
      children: childCompanies.map((elem, index) => {
        return{
          title: <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${elem._id}?page=1&limit=10&tabKey=1`}>{elem.name}</Link>,
          key:   `${i+1} - ${index}`,
        }
      }),
    }
  })

  const filter      = treeCompanies.filter((el) => el.key === item._id)
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
        : <Link to={`/DLC Žurnalas/Įmonių_Sąrašas/${item._id}?page=1&limit=10&tabKey=1`}>{HighlightText(searchValue, item.name)}</Link>}
    </>
  )
}

export default ChildCompaniesTree