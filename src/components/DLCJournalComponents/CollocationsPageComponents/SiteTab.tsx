/* eslint-disable max-len */
import React                                from 'react'
import { generateCsv, get }                 from '../../../Plugins/helpers'
import { useCookies }                       from 'react-cookie'
import CollocationAdditionModal             from './CollocationAdditionModal'
import { Button, Card, List, message }               from 'antd'
import { FileExcelOutlined }                from '@ant-design/icons'
import { useAppDispatch, useAppSelector }   from '../../../store/hooks'
import { setOpenCollocationAdditionModal }  from '../../../auth/ModalStateReducer/ModalStateReducer'
import CollocationListItem                  from './CollocationListItem'
import { Premises }                         from '../../../types/globalTypes'
import { useSearchParams }                  from 'react-router-dom'
import SuccessMessage                       from '../../UniversalComponents/SuccessMessage'

type SiteTabProps = {
    name:   string | undefined
    siteId: string | undefined
}

const SiteTab = ({name, siteId}: SiteTabProps) => {
  const [cookies]                       = useCookies(['access_token'])
  const dispatch                        = useAppDispatch()
  const [premises, setPremises]         = React.useState<Premises[]>()
  const openCollocationAdditionModal    = useAppSelector((state) => state.modals.openCollocationAdditionModal)
  const [,setSearchParamas]             = useSearchParams()
  const [messageApi, contextHolder]     = message.useMessage()

  React.useEffect(() => {
    (async () => {
      try {
        if(siteId){
          const premiseRes = await get(`site/premise?siteId=${siteId}`, cookies.access_token)
          setPremises(premiseRes)
        }
      } catch (error) {
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
    })()
  }, [siteId, openCollocationAdditionModal])

  const onPremiseAddition = () => {
    setSearchParamas(`?menuKey=5&tabKey=1&siteId=${siteId}`)
    dispatch(setOpenCollocationAdditionModal(true))
  }

  return (
    <div>
      <Card
        key={name}
        title={
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div>{name}</div>
            <div>
              <Button type='link' onClick={onPremiseAddition}>Pridėti Patalpą</Button>
              <Button
                type='link'
                icon={<FileExcelOutlined />}
                onClick={() => generateCsv('generateAllCollocationsCSV', {siteId: siteId}, cookies.access_token)}>
                Generuoti csv
              </Button>
            </div>
          </div>}
      >
        <List
          grid={{
            gutter: 1,
            column: 5,
            xs:     1,
            sm:     2,
            md:     2,
            lg:     2,
            xl:     3,
            xxl:    3,
          }}
          bordered
          dataSource={premises}
          renderItem={(item) => (<CollocationListItem siteId={siteId} item={item} premises={premises} setPremises={setPremises}/>)}
        />
      </Card>
      <CollocationAdditionModal/>
      <SuccessMessage contextHolder={contextHolder}/>
    </div>
  )
}

export default SiteTab