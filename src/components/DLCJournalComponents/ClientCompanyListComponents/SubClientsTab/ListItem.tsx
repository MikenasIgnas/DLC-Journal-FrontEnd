/* eslint-disable max-len */
import React                from 'react'
import { Avatar, List }     from 'antd'
import SubClientTag         from './SubClientTag'
import useFetch             from '../../../../customHooks/useFetch'
import { CompanyInfoType }  from '../../../../types/globalTypes'

type ListItemProps = {
  listItemId:               number | undefined;
  photo:                    string | undefined;
  title:                    string | React.ReactNode;
  description:              string;
  wasMainClient?:               boolean
  removeFormSubClientList?: (subClientId: number | undefined) => void
  photosFolder:             string;
  altImage:                 string;
  primaryKey?:              number | undefined
  listButtons:              (listItemId: number | undefined, primaryKey : number | undefined, wasMainClient?: boolean) => React.JSX.Element[]
};

type CompaniesType = {
  data:{
    _id: string;
    id: number;
    parentCompanyId?: number | undefined;
    wasMainClient?: boolean | undefined;
    companyInfo: CompanyInfoType;
  }
}

const ListItem = ({
  listItemId,
  photo,
  title,
  description,
  photosFolder,
  altImage,
  primaryKey,
  listButtons,
  wasMainClient,
}: ListItemProps) => {
  const buttons       = listButtons(listItemId, primaryKey, wasMainClient)
  const parentCompany = useFetch<CompaniesType>(`getSingleCompany?companyId=${primaryKey}`)
  const companyName   = parentCompany?.data?.companyInfo.companyName

  return (
    <List.Item
      key={listItemId}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
      actions={buttons}>
      <List.Item.Meta
        avatar={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar src={<img style={{objectFit: 'contain'}} src={`../${photosFolder}/${photo ? photo : `${altImage}`}`} alt='err' />}/>
          </div>
        }
        title={title}
        description={description}
      />
      {primaryKey && parentCompany?.data && <SubClientTag parentCompanyId={primaryKey} companyName={companyName}/>}
    </List.Item>
  )
}

export default ListItem