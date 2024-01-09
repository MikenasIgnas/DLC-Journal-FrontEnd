/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import React                    from 'react'
import { CheckboxChangeEvent }  from 'antd/es/checkbox'
import { State }                from '../types/globalTypes'

type CompanyFormType = {
companyName?:           string,
companyDescription?:    string,
companyPhoto?:          string,
subClient?: {
  subClientId:          string;
  subClientCompanyName: string
  }[]
J13?: {
  [key: string]: string[];
}[];
T72?: {
  [key: string]: string[];
}[];
};

const useSetCheckedCollocationList = () => {
  const [checkboxList, setCheckboxList] = React.useState<State>({
    checkedList:    {},
    checkAllStates: {},
  })

  const onCheckAllChange = React.useCallback((e: CheckboxChangeEvent, racks: string[], premiseName: string, site: string) => {
    setCheckboxList(prevState => {
      const updatedPremises = prevState.checkedList[site] ? [...prevState.checkedList[site]] : []
      const premiseIndex = updatedPremises.findIndex(premise => premise[premiseName] !== undefined)
      const newPremises = {
        [premiseName]: e.target.checked ? racks : [],
      }

      if (premiseIndex !== -1) {
        updatedPremises[premiseIndex] = newPremises
      } else {
        updatedPremises.push(newPremises)
      }

      return {
        ...prevState,
        checkedList: {
          ...prevState.checkedList,
          [site]: updatedPremises,
        },
        checkAllStates: {
          ...prevState.checkAllStates,
          [`${site}_${premiseName}`]: e.target.checked,
        },
      }
    })
  }, [])

  const onCheckboxChange = React.useCallback((selectedRacks: string[], premiseName: string, site: string, racks: string[]) => {
    setCheckboxList(prevState => {
      const updatedPremises = prevState.checkedList[site] ? [...prevState.checkedList[site]] : []
      const premiseIndex = updatedPremises.findIndex(premise => premise[premiseName] !== undefined)
      const newPremises = {
        [premiseName]: selectedRacks,
      }

      if (premiseIndex !== -1) {
        updatedPremises[premiseIndex] = newPremises
      } else {
        updatedPremises.push(newPremises)
      }

      const isAllChecked = selectedRacks.length === racks.length
      return {
        ...prevState,
        checkedList: {
          ...prevState.checkedList,
          [site]: updatedPremises,
        },
        checkAllStates: {
          ...prevState.checkAllStates,
          [`${site}_${premiseName}`]: isAllChecked,
        },
      }
    })
  }, [])

  const filterObject = (obj: CompanyFormType): CompanyFormType => {
    const filteredObj: CompanyFormType = {}
    if (obj.J13) {
      filteredObj.J13 = []
      for (const key in obj.J13) {
        const entries = Object.entries(obj.J13[key])
        if (entries.length > 0) {
          const nonEmptyEntry = entries.find(([_, values]) => values.length > 0)
          if (nonEmptyEntry) {
            filteredObj.J13.push({ [nonEmptyEntry[0]]: nonEmptyEntry[1] })
          }
        }
      }
    }
    if (obj.T72) {
      filteredObj.T72 = []
      for (const key in obj.T72) {
        const entries = Object.entries(obj.T72[key])
        if (entries.length > 0) {
          const nonEmptyEntry = entries.find(([_, values]) => values.length > 0)
          if (nonEmptyEntry) {
            filteredObj.T72.push({ [nonEmptyEntry[0]]: nonEmptyEntry[1] })
          }
        }
      }
    }
    return filteredObj
  }
  const { checkedList, checkAllStates } = checkboxList
  const filteredResult = filterObject(checkedList)

  return { filteredResult, setCheckboxList, checkedList, checkAllStates, onCheckAllChange, onCheckboxChange }
}

export default useSetCheckedCollocationList