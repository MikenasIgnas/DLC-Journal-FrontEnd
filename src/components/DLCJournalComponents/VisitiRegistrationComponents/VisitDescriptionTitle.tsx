import { Button } from 'antd'
import React from 'react'

type VisitDescriptionTitleProps = {
    edit: boolean;
}

const VisitDescriptionTitle = ({edit}: VisitDescriptionTitleProps) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div>Vizito informacija</div>
      <Button htmlType='submit'>{!edit ? 'Edit' : 'Save'}</Button>
    </div>
  )
}

export default VisitDescriptionTitle