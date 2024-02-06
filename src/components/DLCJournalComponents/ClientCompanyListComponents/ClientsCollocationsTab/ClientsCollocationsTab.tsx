/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
import ClientsCollocations          from './ClientsCollocations'
import EditableCollocationFormList  from './CollocationFormList'
import { CheckboxValueType }        from 'antd/es/checkbox/Group'

type ClientsCollocationsTabProps = {
  companyRacks:     string[] | undefined
  edit:             boolean
  setCheckedLists:  React.Dispatch<React.SetStateAction<CheckboxValueType[]>>
  checkedLists:     CheckboxValueType[]
}

const ClientsCollocationsTab = ({ companyRacks, edit, checkedLists, setCheckedLists }: ClientsCollocationsTabProps) => {
  return (
    <>
      {!edit ?
        <ClientsCollocations companyRacks={companyRacks}/>
        :
        <EditableCollocationFormList
          checkedLists={checkedLists}
          setCheckedLists={setCheckedLists}
          companyRacks={companyRacks}
        />
      }
    </>
  )
}

export default ClientsCollocationsTab