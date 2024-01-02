/* eslint-disable max-len */
import React            from 'react'
import { Avatar, List } from 'antd'
import SubClientTag     from './SubClientTag'
import HighlightText from '../../../UniversalComponents/HighlightText'

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
  const buttons = listButtons(listItemId, primaryKey, wasMainClient)
  return (
    <List.Item
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      actions={buttons}>
      <List.Item.Meta
        avatar={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar src={<img src={`../${photosFolder}/${photo ? photo : `${altImage}`}`} alt='err' />}/>
          </div>
        }
        title={title}
        description={description}
      />
      {primaryKey ? <SubClientTag parentCompanyId={primaryKey}/> : ''}
    </List.Item>
  )
}

export default ListItem