import React                from 'react'
import { Button }           from 'antd'
import { getPdfFile }       from '../../../Plugins/helpers'
import { useCookies }       from 'react-cookie'
import { FilePdfOutlined }  from '@ant-design/icons'
import { useParams }        from 'react-router'

type VisitDescriptionTitleProps = {
    edit: boolean;
}

const VisitDescriptionTitle = ({edit}: VisitDescriptionTitleProps) => {
  const [cookies] = useCookies(['access_token'])
  const {id}      = useParams()
  const generatePDF = async (visitId: number) => {
    try {
      const response = await getPdfFile(`generatePDF?visitId=${visitId}`, cookies.access_token)
      if(response){
        const blob = new Blob([response], { type: 'visit/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'visit.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }


  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div>Vizito informacija</div>
      <div>
        <Button icon={<FilePdfOutlined />} onClick={() => generatePDF(Number(id))}></Button>
        <Button htmlType='submit'>{!edit ? 'Edit' : 'Save'}</Button>
      </div>
    </div>
  )
}

export default VisitDescriptionTitle