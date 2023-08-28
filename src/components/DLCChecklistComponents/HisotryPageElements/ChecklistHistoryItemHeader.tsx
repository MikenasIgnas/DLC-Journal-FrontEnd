/* eslint-disable max-len */
import React                    from 'react'
import { useAppSelector }       from '../../../store/hooks'
import { Button }               from 'antd'
import { useCookies }           from 'react-cookie'
import jwt_decode               from 'jwt-decode'
import { TodoType, TokenType }  from '../../../types/globalTypes'

type ChecklistHistoryItemHeaderProps = {
    areaName:       string | undefined,
    itemId:         string | undefined,
    setEdit:        React.Dispatch<React.SetStateAction<boolean>>,
    todo:           TodoType[] | undefined,
    setActiveKey:   React.Dispatch<React.SetStateAction<string[] | undefined>>,
  }

const ChecklistHistoryItemHeader = ({areaName, itemId, setEdit, todo, setActiveKey} : ChecklistHistoryItemHeaderProps) => {
  const defaultPageTheme =        useAppSelector((state)=> state.theme.value)
  const [cookies] =               useCookies(['access_token'])
  const decodedToken:TokenType =  jwt_decode(cookies.access_token)
  const isMobile =                window.innerWidth < 650

  const editItem = () => {
    setEdit(true)
    const key = todo?.map((el, i)=> String(i+1))
    setActiveKey(key)
  }

  return (
    <div style={{color: defaultPageTheme ? 'white': 'black'}} className={isMobile ? 'MobileHistoryItemHeader' : 'DekstopHistoryItemHeader'}>
      <div>Patalpa: {areaName}</div>
      { itemId === decodedToken.secret || decodedToken.userRole === 'SYSADMIN' ?
        <div>
          <Button type='link' onClick={editItem}>Edit</Button>
          <Button htmlType='submit' type='link' onClick={() => setEdit(false)}>Save</Button>
        </div>
        : ''
      }
    </div>
  )
}

export default ChecklistHistoryItemHeader