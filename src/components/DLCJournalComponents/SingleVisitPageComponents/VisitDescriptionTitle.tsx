/* eslint-disable max-len */
import React                from 'react'
import { Button }           from 'antd'
import { FilePdfOutlined }  from '@ant-design/icons'
import { useParams }        from 'react-router'
import useGenerateSingleVisitPDF from '../../../Plugins/useGenerateSingleVIsitPDF'

type VisitDescriptionTitleProps = {
    edit: boolean;
}

const VisitDescriptionTitle = ({edit}: VisitDescriptionTitleProps) => {
  const {id}                              = useParams()
  const {generateSingleVisitPDF, loading} =  useGenerateSingleVisitPDF()

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div>Vizito informacija</div>
      <div>
        <Button loading={loading} icon={<FilePdfOutlined />} onClick={() => generateSingleVisitPDF(Number(id))}></Button>
        <Button htmlType='submit'>{!edit ? 'Edit' : 'Save'}</Button>
      </div>
    </div>
  )
}

export default VisitDescriptionTitle