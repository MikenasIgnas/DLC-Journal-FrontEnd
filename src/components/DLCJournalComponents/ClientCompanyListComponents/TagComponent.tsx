/* eslint-disable max-len */
import React                            from 'react'
import { PlusOutlined }                 from '@ant-design/icons'
import { Button, Select, Tag, Tooltip, theme }  from 'antd'
import { useCookies }                   from 'react-cookie'
import { get, post }                    from '../../../Plugins/helpers'
import { CompaniesType }                from '../../../types/globalTypes'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

type OptionsType = {
  value:string;
  label: string;
}

const TagComponent = () => {
  const { token } =                           theme.useToken()
  const {id} =                                useParams()
  const [tags, setTags] =                     React.useState<string[]>([])
  const [inputVisible, setInputVisible] =     React.useState(false)
  const [cookies] =                           useCookies(['access_token'])
  const [selectOptions, setSelectOptions] =   React.useState<OptionsType[]>()
  const [singleCompany, setSingleCompany] =   React.useState<CompaniesType>()
  const navigate = useNavigate()
  React.useEffect(() => {
    (async () => {
      try{
        const allCompanies =  await get('getCompanies', cookies.access_token)
        const company = await get(`SingleCompanyPage/${id}`, cookies.access_token)
        setSingleCompany(company.data)
        setSelectOptions(allCompanies.data)
        const options = allCompanies?.data?.map((el: CompaniesType) => {
          return {value: el?.id, label: el?.companyInfo?.companyName}
        }).filter((ele: {value: string, label: string}) => ele.value !== id)
        setSelectOptions(options)
        const companysSubClient = singleCompany?.companyInfo?.subClient
        if(companysSubClient && companysSubClient?.length > 0){
          const filteredArray = selectOptions?.filter((item1) =>
            !companysSubClient?.some((item2) => item2?.subClientCompanyName === item1.label)
          )
          setSelectOptions(filteredArray)
        }
      }catch(err){
        console.log(err)
      }
    })()
  },[inputVisible])

  const handleClose = async(removedTag: string) => {
    if(selectOptions){
      const newTags = tags.filter((tag) => tag !== removedTag)
      const res = await get(`deleteCompaniesSubClient?companyId=${id}&subClient=${removedTag}`, cookies.access_token)
      setTags(newTags)
      setSelectOptions(res.data.value.companyInfo.subClient)
    }
  }

  const handleInputChange = async (_value: string, options: OptionsType | OptionsType[]) => {
    if (tags) {
      const option = Array.isArray(options) ? options[0] : options
      setTags([...tags, option.label])
      const subClientInfo = {
        subClientId:          option.value,
        subClientCompanyName: option.label,
      }
      await post(`addSubClient?companyId=${id}`, subClientInfo, cookies.access_token)
      setInputVisible(false)
    }
  }



  const handleSelectClose = () => {
    setInputVisible(false)
  }
  const handleSelectOpen = () => {
    setInputVisible(true)
  }
  const tagInputStyle: React.CSSProperties = {
    width:           120,
    height:          22,
    marginInlineEnd: 8,
    verticalAlign:   'top',
  }

  const tagPlusStyle: React.CSSProperties = {
    height:      22,
    background:  token.colorBgContainer,
    borderStyle: 'dashed',
  }
  return (
    <div>
      {singleCompany?.companyInfo?.subClient ?
        singleCompany.companyInfo.subClient.map((el) => {
          const isLongTag = el?.subClientCompanyName.length > 20
          const tagElem = (
            <Tag
              key={el?.subClientId}
              closable={true}
              onClose={() => handleClose(el?.subClientCompanyName)}
              style={{ userSelect: 'none' }}
            >
              <a href={`/SingleCompanyPage/${el.subClientId}`}>{isLongTag ? `${el?.subClientCompanyName?.slice(0, 20)}...` : el?.subClientCompanyName}</a>
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={el?.subClientCompanyName} key={el?.subClientId}>
              {tagElem}
            </Tooltip>
          ) : tagElem
        }) : '' }
      {inputVisible ? (
        <Select
          style={tagInputStyle}
          placeholder='Select or create tag'
          onChange={handleInputChange}
          size='small'
          open={inputVisible}
          options={selectOptions}
          onBlur={handleSelectClose}
          onFocus={handleSelectOpen}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={handleSelectOpen}>
          <PlusOutlined /> Pridėti Kliento Klientą
        </Tag>
      )}
    </div>
  )
}

export default TagComponent