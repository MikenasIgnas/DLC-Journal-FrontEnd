/* eslint-disable max-len */
import React                    from 'react'
import { Avatar, Button, List } from 'antd'
import SubClientTag             from './SubClientTag'
import { Link }                 from 'react-router-dom'

type ListItemProps = {
  showDrawer?:              (listItemId: number | undefined, itemId?: number | undefined) => void
  deleteListItem:           (listItemId: number | undefined, itemId?: number | undefined) => void
  listItemId:               number | undefined;
  photo:                    string | undefined;
  title:                    string | React.ReactNode;
  description:              string;
  subClient?:               boolean
  removeFormSubClientList?: (subClientId: number | undefined) => void
  photosFolder:             string;
  altImage:                 string;
  primaryKey?:              number | undefined
};

const ListItem = ({
  showDrawer,
  deleteListItem,
  removeFormSubClientList,
  listItemId,
  photo,
  title,
  description,
  subClient,
  photosFolder,
  altImage,
  primaryKey,
}: ListItemProps) => {

  return (
    <>
      <List.Item
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        actions={
          [
            showDrawer ? <Button type='link' onClick={() => showDrawer(listItemId, primaryKey)} key={primaryKey}>Peržiūrėti</Button>
              : <Link key={listItemId} to={`/DLC Žurnalas/Įmonių_Sąrašas/${listItemId}`}>Peržiūrėti</Link>,
            subClient === true && <Button type='link' onClick={() => removeFormSubClientList && removeFormSubClientList(listItemId)} key={primaryKey}> Perkelti </Button>,
            <Button type='link' onClick={() => deleteListItem(listItemId, primaryKey)} key={primaryKey}>Ištrinti</Button>,
          ]
        }>
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
        {primaryKey ? <SubClientTag parentCompanyId={primaryKey}/> : ''}
      </List.Item>
    </>
  )
}

export default ListItem