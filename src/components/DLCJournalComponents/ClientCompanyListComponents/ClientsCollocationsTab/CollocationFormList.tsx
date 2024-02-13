/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import React                    from 'react'
import { useAppSelector }       from '../../../../store/hooks'
import { CheckboxValueType }    from 'antd/es/checkbox/Group'
import EditableCollocationList  from './EditableCollocationList'

type CollocationFormListProps = {
  companyRacks?: string[] | undefined
  setCheckedLists:  React.Dispatch<React.SetStateAction<CheckboxValueType[]>>
  checkedLists:     CheckboxValueType[]
}


const EditableCollocationFormList = ({ companyRacks, checkedLists, setCheckedLists }: CollocationFormListProps) => {
  const sites = useAppSelector((state) => state.sites.fullSiteData)

  return (
    <div className='EditableCollocationContainer'>
      {sites?.map((item, i) =>
        <EditableCollocationList
          setCheckedLists={setCheckedLists}
          checkedLists={checkedLists}
          companyRacks={companyRacks}
          key={i}
          item={item}
        />
      )}
    </div>
  )
}

export default EditableCollocationFormList