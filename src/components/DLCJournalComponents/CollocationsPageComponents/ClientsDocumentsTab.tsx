import React            from 'react'
import DocumentUploader from '../../UniversalComponents/DocumentUploader/DocumentUploader'


const ClientsDocumentsTab = () => {
  const [, setUploading]          = React.useState(false)

  return(
    <DocumentUploader setUploading={setUploading}/>
  )
}

export default ClientsDocumentsTab