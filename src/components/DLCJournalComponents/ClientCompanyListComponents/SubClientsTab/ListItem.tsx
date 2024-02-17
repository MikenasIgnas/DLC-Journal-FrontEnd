/* eslint-disable max-len */
import { Avatar, List }  from 'antd'
import SubClientTag      from './SubClientTag'
import { CompaniesType } from '../../../../types/globalTypes'

type ListItemProps = {
  removeFormSubClientList?: (subClientId: string | undefined) => void
  photosFolder:             string;
  altImage:                 string;
  listButtons:              (listItemId: string | undefined) => JSX.Element[] | undefined
  item:                     CompaniesType
  title?:                   JSX.Element
  id:                       string | undefined
};

const ListItem = ({
  id,
  item,
  photosFolder,
  altImage,
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
        title={item.name}
        description={item?.description}
      />
      {item.parentId && <SubClientTag parentCompanyId={item.parentId}/>}
    </List.Item>
  )
}

export default ListItem