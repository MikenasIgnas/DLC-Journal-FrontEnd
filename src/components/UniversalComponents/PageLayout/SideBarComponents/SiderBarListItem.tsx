/* eslint-disable max-len */
import React            from 'react'
import UnNestesListItem from './UnNestesListItem'
import NestedListItem   from './NestedListItem'

type SiderBarListItemProps = {
  itemName:       string;
  itemIcon:       React.ReactNode;
  nested:         boolean;
  nestedItems?:   {itemName:string, link:string}[]
  link?:           string;
}

const SiderBarListItem = ({itemName, itemIcon, nested, nestedItems, link}: SiderBarListItemProps) => {
  return (
    <>
      {!nested
        ?
        <UnNestesListItem link={link} itemName={itemName} itemIcon={itemIcon}/>
        :
        <NestedListItem nestedItems={nestedItems} itemName={itemName} itemIcon={itemIcon} link={link}/>
      }
    </>
  )
}

export default SiderBarListItem