/* eslint-disable max-len */
import { Button }                 from 'antd'
import { FilePdfOutlined }        from '@ant-design/icons'
import { useParams }              from 'react-router'
import useGenerateSingleVisitPDF  from '../../../Plugins/useGenerateSingleVIsitPDF'
import { useAppSelector } from '../../../store/hooks'


const VisitDescriptionTitle = () => {
  const {id}                              = useParams()
  const {generateSingleVisitPDF, loading} =  useGenerateSingleVisitPDF()
  const editVisitInformation              = useAppSelector((state) => state.visitPageEdits.editVisitInformation)
  const isSecurity                        = useAppSelector((state) => state.auth.isSecurity)
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div>Vizito informacija</div>
      <div>
        {
          !isSecurity &&
          <>
            <Button loading={loading} icon={<FilePdfOutlined />} onClick={() => id && generateSingleVisitPDF(id)}></Button>
            <Button htmlType='submit'>{!editVisitInformation ? 'Edit' : 'Save'}</Button>
          </>
        }
      </div>
    </div>
  )
}

export default VisitDescriptionTitle