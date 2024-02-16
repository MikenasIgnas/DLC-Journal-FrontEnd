/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Avatar, List }     from 'antd'
import SubClientTag         from './SubClientTag'

type ListItemProps = {
  removeFormSubClientList?: (subClientId: string | undefined) => void
  photosFolder:             string;
  altImage:                 string;
  listButtons:              (listItemId: string | undefined) => JSX.Element[] | undefined
  item: any
  title?: JSX.Element
  id: string
};

const ListItem = ({
  id,
  item,
  photosFolder,
  altImage,
  title,
  listButtons,
}: ListItemProps) => {
  const buttons       = listButtons(id)
  return (
    <List.Item
      key={item._id}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}
      actions={buttons}>
      <List.Item.Meta
        avatar={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar src={<img style={{objectFit: 'contain'}} src={item.photo ? item.photo : `../${photosFolder}/${altImage}`} alt='err' />}/>
          </div>
        }
        title={title}
        description={item.description}
      />
      {item.parentId && <SubClientTag parentCompanyId={item.parentId}/>}
    </List.Item>
  )
}

export default ListItem