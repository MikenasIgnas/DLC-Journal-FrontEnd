/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable max-len */
import { Avatar, Button, ConfigProvider, List, Tree, TreeProps }                 from 'antd'
import React                                    from 'react'
import { get }                                  from '../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'
import { CollocationsType, CompaniesType, ModalStateType }      from '../../types/globalTypes'
import { Link }                                 from 'react-router-dom'
import { PaginationAlign, PaginationPosition }  from 'antd/es/pagination/Pagination'
import CompanyAddition                          from '../../components/DLCJournalComponents/ClientCompanyListComponents/CompanyAdditionComponent/CompanyAddition'
import SubClientTag                             from '../../components/DLCJournalComponents/ClientCompanyListComponents/SubClientTag'
import { DownOutlined }                         from '@ant-design/icons'

const CompaniesListPage = () => {
  const [loading, setLoading] =               React.useState(false)
  const [cookies] =                           useCookies(['access_token'])
  const [companies, setCompanies] =           React.useState<CompaniesType[]>([])
  const position: PaginationPosition =        'bottom'
  const align: PaginationAlign =              'center'
  const [collocations, setCollocations] =     React.useState<CollocationsType[]>()
  const [modalState, setModalState] =           React.useState<ModalStateType>({
    editClientsEmployee:         false,
    edit:                        false,
    isEmployeeAdditionModalOpen: false,
    isCompanyAdded:              false,
    isModalOpen:                 false,
  })

  React.useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        const allComapnies = await get('getCompanies', cookies.access_token)
        const collocations = await get('getCollocations', cookies.access_token)
        setCollocations(collocations.data[0].colocations)
        if(!allComapnies.error){
          setCompanies(allComapnies.data)
        }
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    })()
  },[modalState.isModalOpen])

  const companyRemoved = (id:string) => {
    let newCompaniesList = [...companies]
    newCompaniesList = newCompaniesList.filter(x => x?.id !== id)
    setCompanies(newCompaniesList)
  }

  const delteCompany = async(companyId: string) => {
    await get(`deleteCompany/${companyId}`, cookies.access_token)
    companyRemoved(companyId)
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const treeCompanies = companies?.map((el, i) => {
    const childCompanies = companies.filter((ele) => ele.parentCompanyId === el.id)
    return{
      title:    <Link to={`/SingleCompanyPage/${el.id}`}>{el.companyInfo.companyName}</Link>,
      key:      el.id,
      children: childCompanies.map((elem, index) => {

        return{
          title: <Link to={`/SingleCompanyPage/${elem.id}`}>{elem.companyInfo.companyName}</Link>,
          key:   `${i+1} - ${index}`,
        }
      }),

    }
  })
  return (
    <div style={{width: '97%'}}>
      <CompanyAddition
        modalState={modalState}
        postUrl={'addCompany'}
        collocations={collocations}
        additionModalTitle={'Pridėkite įmonę'}
        setModalState={setModalState}
      />
      <List
        loading={loading}
        pagination={{ position, align}}
        dataSource={companies}
        renderItem={(item) => {
          const filter = treeCompanies.filter((el) => el.key === item.id)
          return(
            <List.Item
              style={{width: '100%', display: 'flex'}}
              actions={[
                <Link key={item.id} to={`/SingleCompanyPage/${item.id}`}>peržiūrėti</Link>,
                <Button key={item.id} onClick={() => delteCompany(item.id)} type='link'>ištrinti</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={<img
                  src={`../CompanyLogos/${item.companyInfo.companyPhoto !== '' ? item.companyInfo.companyPhoto : 'noImage.jpg'}` }
                  alt='err' />}
                />}
                title={
                  filter[0].children.length >= 1 ?
                    <ConfigProvider theme={{
                      token: {
                        colorBgContainer: 'none',
                      },
                    }}>
                      <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        defaultExpandedKeys={['0-0-0']}
                        onSelect={onSelect}
                        treeData={filter}
                      />
                    </ConfigProvider>
                    : <Link to={`/SingleCompanyPage/${item.id}`}>{item.companyInfo.companyName}</Link>
                }
                description={ item?.companyInfo?.companyDescription}
              />
              {item?.parentCompanyId ? <SubClientTag parentCompanyId={item.parentCompanyId}/> : ''}
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default CompaniesListPage