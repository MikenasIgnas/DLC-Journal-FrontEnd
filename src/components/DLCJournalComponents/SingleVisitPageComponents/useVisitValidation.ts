/* eslint-disable max-len */
import { get }        from '../../../Plugins/helpers'
import { useParams }  from 'react-router'
import { useCookies } from 'react-cookie'
import { VisitsType } from '../../../types/globalTypes'
import { message }    from 'antd'

const useVisitValidation =  () => {
  const {id}                        = useParams()
  const [cookies]                   = useCookies(['access_token'])
  const [messageApi, contextHolder] = message.useMessage()

  const validate = async(
    visitData: VisitsType[] | undefined,
    edit: boolean, fetchData: () => Promise<void>,
    url: string,
    validationSuccessMessage :string
  ) => {
    const hasId         = visitData?.[0]?.visitors?.every(obj => obj.idType !== null && obj.idType !== '')
    const hasSignatures = visitData?.[0]?.visitors?.every(obj => obj.signature && obj.signature !== null && obj.signature !== undefined)
    if(visitData && visitData?.[0]?.visitPurpose.length > 0 && visitData && visitData?.[0]?.visitors.length > 0 && hasId && hasSignatures && !edit ) {
      const res = await get(`${url}?visitId=${id}`, cookies.access_token)
      if(!res.error){
        messageApi.success({
          type:    'success',
          content: validationSuccessMessage,
        })
        await fetchData()
      }
    }else if(edit){
      messageApi.error({
        type:    'error',
        content: 'Neišsaugoti duomenys',
      })
    }else if(visitData && visitData?.[0]?.visitors.length <= 0 ){
      messageApi.error({
        type:    'error',
        content: 'Nepasirinkti įmonės darbuotojai',
      })
    }else if (visitData && visitData?.[0]?.visitPurpose.length <= 0 ){
      messageApi.error({
        type:    'error',
        content: 'Nepasirinktas vizito tikslas',
      })
    }else if(!hasId){
      messageApi.error({
        type:    'error',
        content: 'Nepasirinktas dokumento tipas',
      })
    }else if(!hasSignatures){
      messageApi.error({
        type:    'error',
        content: 'Trūksta parašo',
      })
    }
  }

  return {validate, contextHolder}
}

export default useVisitValidation