/* eslint-disable max-len */
import React                            from 'react'
import { Avatar, Button, List }         from 'antd'
import SubClientTag                     from './SubClientTag'
import { Link }                         from 'react-router-dom'

type ListItemProps = {
  showDrawer?: (listItemId: string | undefined, itemId?: string | undefined) => void
  deleteListItem: (listItemId: string | undefined, itemId: string | undefined) => void
  listItemId: string | undefined;
  employeeId?: string | undefined;
  photo: string | undefined;
  title: string | React.ReactNode;
  description: string;
  subClient?: boolean
  removeFormSubClientList?: (subClientId: string | undefined) => void
  photosFolder: string;
  altImage: string;
  parentCompanyId?: string | undefined
};

const ListItem = ({
  showDrawer,
  deleteListItem,
  listItemId,
  employeeId,
  photo,
  title,
  description,
  subClient,
  removeFormSubClientList,
  photosFolder,
  altImage,
  parentCompanyId,
}: ListItemProps) => {

  return (
    <>
      <List.Item
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        actions={[
          showDrawer ? <Button type='link' onClick={() => showDrawer(listItemId, employeeId)} key={employeeId}>Peržiūrėti</Button>
            : <Link key={listItemId} to={`/DLC Žurnalas/Įmonių_Sąrašas/${listItemId}`}>peržiūrėti</Link>,
          subClient === true && <Button type='link' onClick={() => removeFormSubClientList && removeFormSubClientList(listItemId)} key={employeeId}> Perkelti </Button>,
          <Button type='link' onClick={() => deleteListItem(listItemId, employeeId)} key={employeeId}>Ištrinti</Button>,
        ]}>
        <List.Item.Meta
          avatar={
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{marginRight: '10px'}}>{listItemId}</div>
              <Avatar src={<img src={`../${photosFolder}/${photo ? photo : `${altImage}`}`} alt='err' />}/>
            </div>
          }
          title={<>{title}</>}
          description={description}
        />
        {parentCompanyId ? <SubClientTag parentCompanyId={parentCompanyId}/> : ''}
      </List.Item>
    </>
  )
}

export default ListItem