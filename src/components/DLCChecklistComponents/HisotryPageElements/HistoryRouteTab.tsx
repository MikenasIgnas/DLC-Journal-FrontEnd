/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import React                                from 'react'
import { Form, message }                    from 'antd'
import { useAppDispatch, useAppSelector }   from '../../../store/hooks'
import FilledHistoryData                    from './FilledHistoryData'
import { post }                             from '../../../Plugins/helpers'
import { useParams }                        from 'react-router-dom'
import { useCookies }                       from 'react-cookie'
import { setProblemCount }                  from '../../../auth/FetchedDataReducer/fetchedDataReducer'
import SuccessMessage                       from '../../ChhecklistBody/SuccessMessage'

type AreasComponentProps = {
  routeID:      number | undefined,
  itemId:       string | undefined,
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>,
};

type ValuesType = {
  [key: string]: Array<{
    [key: string]: boolean | { ticketNr?: string } | { time?: string };
  }>;
};

const HistoryRouteTab = ({ routeID, itemId, setIsUpdated }:AreasComponentProps) => {
  const { id } =                        useParams()
  const [cookies] =                     useCookies(['access_token'])
  const [form] =                        Form.useForm()
  const areas =                         useAppSelector((state) => state.fetchedData.Areas)?.filter((el) => el.routesId === routeID)
  const filledData =                    useAppSelector((state) => state.fetchedData.FilledData)
  const mapped =                        filledData?.map((el)=> el.values)
  const dispatch =                      useAppDispatch()
  const [messageApi, contextHolder] =   message.useMessage()
  const onFinish = async(values:ValuesType) => {
    const updatedData = mapped?.map(obj => {
      return Object.keys(obj).reduce((updatedObj:any, key) => {
        const value = values[key] || obj[key]
        updatedObj[key] = value
        return updatedObj
      }, {})
    })

    if(updatedData){
      for (let i = 0; i < updatedData.length; i++) {
        const pageID = updatedData[i].pageID
        if (values.hasOwnProperty(pageID)) {
          updatedData[i].values = values[pageID]
        }
      }

      const updatedArray = filledData?.map((obj, index) => {
        const replacement = updatedData[index]
        const updatedObj = {
          ...obj,
          values: replacement,
        }
        return updatedObj
      })
      const problemCount = updatedArray?.reduce((count, obj) => {
        const values = Object.values(obj.values).flat()
        const trueValues = values.filter((value: any) => Object.values(value)[0] === true)
        return count + trueValues.length
      }, 0)

      if(problemCount){
        dispatch(setProblemCount(problemCount))
      }
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
      await post(`updateHistoryItem/${id}`, {updatedArray, problemCount}, cookies.access_token)
      setIsUpdated(true)
    }
  }

  return (
    <Form form={form} onFinish={onFinish}>
      {areas?.map((area) => <FilledHistoryData itemId={itemId} key={area.id} routeID={routeID} areasID={area.id} areaName={area.roomName}/>)}
      <SuccessMessage contextHolder={contextHolder} />
    </Form>
  )
}

export default HistoryRouteTab
