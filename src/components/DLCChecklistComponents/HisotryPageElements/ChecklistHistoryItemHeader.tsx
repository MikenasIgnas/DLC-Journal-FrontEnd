/* eslint-disable max-len */
import React                    from 'react'
import { useAppSelector }       from '../../../store/hooks'
import { Button }               from 'antd'
import { useCookies }           from 'react-cookie'
import {jwtDecode}              from 'jwt-decode'
import { TodoType, TokenType }  from '../../../types/globalTypes'

type ChecklistHistoryItemHeaderProps = {
    areaName:       string | undefined,
    itemId:         string | undefined,
    setEdit:        React.Dispatch<React.SetStateAction<boolean>>,
    todo:           TodoType[] | undefined,
    setActiveKey:   React.Dispatch<React.SetStateAction<string[] | undefined>>,
  }

const ChecklistHistoryItemHeader = ({areaName, itemId, setEdit, todo, setActiveKey} : ChecklistHistoryItemHeaderProps) => {
  const isMobile                = window.innerWidth < 650

  const editItem = () => {
    setEdit(true)
    const key = todo?.map((el, i)=> String(i+1))
    setActiveKey(key)
  }

  return (
    <div className={isMobile ? 'MobileHistoryItemHeader' : 'DekstopHistoryItemHeader'}>
      <div>Patalpa: {areaName}</div>
      <div>
        <Button type='link' onClick={editItem}>Edit</Button>
        <Button htmlType='submit' type='link' onClick={() => setEdit(false)}>Save</Button>
      </div>
    </div>
  )
}

export default ChecklistHistoryItemHeader