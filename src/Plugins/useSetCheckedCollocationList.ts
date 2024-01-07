/* eslint-disable max-len */
import React                    from 'react'
import { CheckboxChangeEvent }  from 'antd/es/checkbox'
import { CollocationType }      from '../types/globalTypes'
import { useCookies }           from 'react-cookie'
import { get }  from './helpers'

interface CheckedListState {
  [key: string]: { [premiseName: string]: string[] }[];
}

const useSetCheckedCollocationList = () => {
  const [collocations, setCollocations]     = React.useState<CollocationType[]>()
  const [checkedList, setCheckedList]       = React.useState<CheckedListState>({})
  const [checkAllStates, setCheckAllStates] = React.useState<{ [key: string]: boolean }>({})

  const [cookies] = useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      const allCollocations = await get('getCollocations', cookies.access_token)
      localStorage.removeItem('visitPurpose')
      setCollocations(allCollocations.data)
    })()
  }, [])

  const onCheckAllChange = (e: CheckboxChangeEvent, values: string[], category: string, site: string) => {
    setCheckedList((prev) => {
      const existingList = prev[site] || []
      const updatedList = [
        ...existingList,
        {
          [category]: e.target.checked ? values : [],
        },
      ]
      return {
        ...prev,
        [site]: updatedList,
      }
    })
    setCheckAllStates((prev) => ({
      ...prev,
      [site]: e.target.checked,
    }))
  }

  const onCheckboxChange = (list: string[], category: string, site: string) => {
    setCheckedList((prev) => {
      const existingList = prev[site] || []
      const updatedList = [
        ...existingList,
        {
          [category]: list,
        },
      ]
      return {
        ...prev,
        [site]: updatedList,
      }
    })
    setCheckAllStates((prev) => ({
      ...prev,
      [site]: list.length === (collocations?.find((collocation) => Object.keys(collocation)[0] === category)?.[category]?.length || 0),
    }))
  }

  return { checkedList, checkAllStates, onCheckAllChange, onCheckboxChange }
}

export default useSetCheckedCollocationList