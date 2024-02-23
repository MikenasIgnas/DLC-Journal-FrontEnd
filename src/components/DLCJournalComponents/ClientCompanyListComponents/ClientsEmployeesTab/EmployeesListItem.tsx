/* eslint-disable max-len */
import { EmployeesType }    from '../../../../types/globalTypes'
import { Avatar, List }     from 'antd'

type EmployeesListItemProps = {
    item:         EmployeesType
    photosFolder: string;
    altImage:     string;
    listButtons?: (listItemId: string | undefined) => JSX.Element[] | undefined
    title?:       JSX.Element | string
    id:           string | undefined
    description:  JSX.Element | string;
}

const EmployeesListItem = ({ item, altImage, id, listButtons, photosFolder, title, description }: EmployeesListItemProps) => {
  const buttons = listButtons && listButtons(id)

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
        description={description}
      />
    </List.Item>
  )
}

export default EmployeesListItem

