/* eslint-disable max-len */
import * as React           from 'react'
import { useSearchParams }  from 'react-router-dom'
import { useCookies }       from 'react-cookie'
import { get }              from '../../../Plugins/helpers'
import VisitPurposeButtons  from './VisitPurposeButtons'
import { Button, theme }    from 'antd'

type VisitPurposeFormProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const VisitPurposeForm = ({ setCurrent }: VisitPurposeFormProps) => {
  const [searchParams] =                useSearchParams()
  const employeeId =                    searchParams.get('employeeId')
  const companyId =                     searchParams.get('companyId')
  const [cookies] =                     useCookies(['access_token'])
  const [permissions, setPermissions] = React.useState<string[]>()
  const { token } =                     theme.useToken()

  React.useEffect(() => {
    (async () => {
      const visitingClient = await get(`getClientsEmployee?companyId=${companyId}&employeeId=${employeeId}`, cookies.access_token)
      const filteredArray = visitingClient.data.permissions.filter((item: string)=> item !== 'Įleisti Trečius asmenis')
      setPermissions(filteredArray)
    })()
  }, [])

  const contentStyle: React.CSSProperties = {
    lineHeight:      '260px',
    textAlign:       'center',
    color:           token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius:    token.borderRadiusLG,
    border:          `1px dashed ${token.colorBorder}`,
    marginTop:       16,
    width:           '100%',
    justifyContent:  'space-between',
    display:         'flex',
  }

  return (
    <div >
      <div style={contentStyle}>
        {permissions?.map((el, i) => <VisitPurposeButtons buttonText={el} key={i} buttonWidth={(100 / permissions.length) - 5}/>)}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Button style={{marginTop: '20px'}} onClick={() => setCurrent(0)}>Atgal</Button>
        <Button style={{marginTop: '20px'}} onClick={() => setCurrent(2)}>Kitas</Button>
      </div>
    </div>
  )
}

export default VisitPurposeForm