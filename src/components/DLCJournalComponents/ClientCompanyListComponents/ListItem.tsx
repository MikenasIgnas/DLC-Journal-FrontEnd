/* eslint-disable max-len */
import React from 'react'
import { Avatar, Button, List } from 'antd'

type ListItemProps = {
  showDrawer: (listItemId: string | undefined, itemId?: string | undefined) => void
  deleteListItem: (listItemId: string | undefined, itemId: string | undefined) => void
  listItemId: string | undefined;
  itemId?: string | undefined;
  photo: string | undefined;
  title: string;
  description: string;
  subClient?: boolean
  removeFormSubClientList?: (subClientId: string | undefined) => void
  photosFolder: string;
  altImage: string;
};

const ListItem = ({
  showDrawer,
  deleteListItem,
  listItemId,
  itemId,
  photo,
  title,
  description,
  subClient,
  removeFormSubClientList,
  photosFolder,
  altImage,
}: ListItemProps) => {
  return (
    <>
      <List.Item
        actions={[
          <Button type='link' onClick={() => showDrawer(listItemId, itemId)} key={itemId}>
                Peržiūrėti
          </Button>,
          subClient === true && <Button type='link' onClick={() => removeFormSubClientList && removeFormSubClientList(listItemId)} key={itemId}> Perkelti </Button>,
          <Button type='link' onClick={() => deleteListItem(listItemId, itemId)} key={itemId}>
                    Ištrinti
          </Button>,
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar src={
              <img
                src={`../${photosFolder}/${photo ? photo : `${altImage}`}`}
                alt='err' />}
            />}
          title={<p>{title}</p>}
          description={description}

        />
      </List.Item>
    </>
  )
}

export default ListItem