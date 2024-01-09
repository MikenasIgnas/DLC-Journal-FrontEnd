/* eslint-disable max-len */
import ClientsCollocations                                          from './ClientsCollocations'
import { CollocationsSites, CollocationsType, ColocationDataType, State }  from '../../../../types/globalTypes'
import EditableCollocationFormList                                  from './CollocationFormList'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

type ClientsCollocationsProps = {
    J13locationName:   string | undefined
    T72locationName:   string | undefined
    J13locationData:   ColocationDataType[] | undefined
    T72locationData:   ColocationDataType[] | undefined
    edit:              boolean;
    collocations:      CollocationsType[] | undefined
    collocationsSites: CollocationsSites
    checkedList: {
      [site: string]: {
          [premiseName: string]: string[];
      }[];
    };
    checkAllStates: {
      [key: string]: boolean;
    };
    onCheckAllChange: (e: CheckboxChangeEvent, racks: string[], premiseName: string, site: string) => void;
    onCheckboxChange: (selectedRacks: string[], premiseName: string, site: string, racks: string[]) => void;
    setCheckedList: React.Dispatch<React.SetStateAction<State>>
}


const ClientsCollocationsTab = ({
  J13locationData,
  J13locationName,
  T72locationData,
  T72locationName,
  edit,
  collocations,
  collocationsSites,
  checkAllStates,
  checkedList,
  onCheckAllChange,
  onCheckboxChange,
  setCheckedList,
}: ClientsCollocationsProps) => {
  return (
    <>
      {!edit ?
        <ClientsCollocations
          J13locationName={J13locationName}
          J13locationData={J13locationData}
          T72locationName={T72locationName}
          T72locationData={T72locationData}
        />
        :
        <EditableCollocationFormList
          setCheckedList={setCheckedList}
          checkAllStates={checkAllStates}
          checkedList={checkedList}
          onCheckAllChange={onCheckAllChange}
          onCheckboxChange={onCheckboxChange}
          collocations={collocations}
          collocationsSites={collocationsSites}
        />
      }
    </>
  )
}

export default ClientsCollocationsTab