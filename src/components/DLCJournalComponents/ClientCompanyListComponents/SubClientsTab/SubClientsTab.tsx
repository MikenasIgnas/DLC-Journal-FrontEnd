/* eslint-disable max-len */
import React                                                from 'react'
import SubClients                                           from '../SubClients'
import { CollocationsSites, CompaniesType, ModalStateType } from '../../../../types/globalTypes'
import CompanyAdditionModal                                 from '../CompanyAdditionComponent/CompanyAdditionModal'
import SubClientAddition                                    from '../SubClientAddition'
import { post }                                             from '../../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'

type SubClientStateType = {
    mainCompanyAddedAsSubClient:  boolean,
    subClientChangedToMainClient: boolean,
  }

  type SubClientsTabProps = {
    parentCompanyId:    string | undefined;
    setModalState:      React.Dispatch<React.SetStateAction<ModalStateType>>;
    modalState:         ModalStateType
    subClientState:     SubClientStateType
    setSubClientState:  React.Dispatch<React.SetStateAction<SubClientStateType>>
    collocationsSites:  CollocationsSites
    mainCompanies:      CompaniesType[]
    setMainCompanies:   React.Dispatch<React.SetStateAction<CompaniesType[]>>
  }

const SubClientsTab = ({modalState, parentCompanyId, setModalState, setSubClientState, subClientState, collocationsSites, mainCompanies, setMainCompanies}: SubClientsTabProps) => {
  const [cookies]                           = useCookies(['access_token'])
  const [selectedValue, setSelectedValue]   = React.useState(null)
  const subClientsCollocations              = []
  let index                                 = 1

  const mainCompaniesOptions = mainCompanies?.map((el) => {
    return{
      value: el.id,
      label: el.companyInfo.companyName,
    }
  })

  const handleChange = async(value: string) => {
    const selectedMainCompany   = mainCompanies?.filter((el) => el.id === value)
    const remainingCompanies    = mainCompanies?.filter((el) => el.id !== value)

    if(remainingCompanies){
      setMainCompanies(remainingCompanies)
      const res =await post(`addMainCompanyAsSubClient?companyId=${value}&parentCompanyId=${parentCompanyId}`, selectedMainCompany?.[0].companyInfo, cookies.access_token)
      if(!res.error){
        setSubClientState({...subClientState, mainCompanyAddedAsSubClient: !subClientState.mainCompanyAddedAsSubClient})
      }
    }

  }
  for (const site in collocationsSites) {
    const premisesData  = collocationsSites[site]
    const premisesArray = premisesData?.map(premiseData => {
      const premiseName = Object.keys(premiseData)[0]
      const racks = premiseData[premiseName]
      return {
        premiseName,
        racks,
      }
    })
    subClientsCollocations.push({
      site,
      id:       `${index++}`,
      premises: premisesArray,
    })
  }

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {modalState.isModalOpen &&
        <CompanyAdditionModal
          setModalState={setModalState}
          modalState={modalState}
          collocations={subClientsCollocations}
          additionModalTitle={'Pridėkite sub klientą'}
          postUrl={`addSubClient?parentCompanyId=${parentCompanyId}`}
        />
      }
      <SubClientAddition
        setModalState={setModalState}
        modalState={modalState}
        selectedValue={selectedValue}
        handleChange={handleChange}
        mainCompaniesOptions={mainCompaniesOptions}
        handleSelect={()=> setSelectedValue(null)}
      />
      <SubClients
        subClientState={subClientState}
        setSubClientState={setSubClientState}
        setModalState={setModalState}
        modalState={modalState}
        parentCompanyId={parentCompanyId}
      />
    </div>
  )
}

export default SubClientsTab