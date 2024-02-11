import React            from 'react'
import DocumentUploader from '../../UniversalComponents/DocumentUploader/DocumentUploader'

type ClientsDocumentsTabProps = {
  companyDocuments: string[] | undefined
}

const ClientsDocumentsTab = ({companyDocuments}: ClientsDocumentsTabProps) => {
  const [, setUploading]          = React.useState(false)

  return(
    <DocumentUploader setUploading={setUploading} companyDocuments={companyDocuments}/>
  )
}

export default ClientsDocumentsTab