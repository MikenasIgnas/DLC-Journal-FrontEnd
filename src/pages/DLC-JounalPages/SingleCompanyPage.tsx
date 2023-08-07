/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React          from 'react'
import { get }        from '../../Plugins/helpers'
import { useCookies } from 'react-cookie'
import { useParams }  from 'react-router-dom'
import { Card }       from 'antd'

type EmployeesType = {
  _id:            string;
  CompanyId:      string;
  employee_name:  string;
  id:             string;
}

type CompaniesSites = {
  _id:            string;
  id:             string;
  CompanyId:      string;
  AvailableSites: string;
}

type CompaniesPremises = {
  _id:            string;
  id:             string;
  siteId:         string;
  premiseName:   string;
}

const SingleCompanyPage = () => {
  const [cookies] =                     useCookies(['access_token'])
  const {id} =                          useParams()
  const [companyName, setCompanyName] = React.useState('')
  const [employees, setEmployees] =     React.useState<EmployeesType[]>()
  const [site, setSites] =              React.useState<CompaniesSites[]>()
  const [premises, setPremises] =       React.useState<CompaniesPremises[]>()

  React.useEffect(() => {
    (async () => {
      try{
        const singleCompany =     await get(`SingleCompanyPage/${id}`, cookies.access_token)
        const companyEmployees =  await get(`getSingleCompaniesEmployees/${id}`, cookies.access_token)
        const companySites =      await get(`getSingleCompaniesSites/${id}`, cookies.access_token)
        const companyPremises =   await get('getCompaniesPremises', cookies.access_token)
        setCompanyName(singleCompany.data.CompanyName)
        setEmployees(companyEmployees.data)
        setSites(companySites.data)
        setPremises(companyPremises.data)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  const addedCompany = [
    {
      companyName:  'Bite',
      companyId:    '1',
      companySites: [
        {
          site:       'T72',
          colocation: [
            { premiseName: 'RA-3',
              rack:        ['S1.1','S1.2','S1.3'],
            },
            { premiseName: 'DC-5',
              rack:        ['S2.1','S2.2','S2.3'],
            },
          ],
        },
      ],
    },
    {
      companyName:  'Ignitis',
      companyId:    '2',
      companySites: [
        {
          site:       'J13',
          colocation: [
            { premiseName: 'DC-3C',
              rack:        ['S5.1','S5.2','S5.3'],
            },
            { premiseName: 'DC-5',
              rack:        ['S7.1','S7.2','S7.3'],
            },
          ],
        },
      ],
    },
  ]

  return (
    <Card title={companyName} bordered={false} style={{ width: 300 }}>
      {employees?.map((el) => <p key={el.id}>{el.employee_name}</p>)}
      {site?.map((el) =>
        <div key={el.id}>
          <div>
            {el.AvailableSites}
          </div>
          <div>
            {premises?.map((premise) =>
              <div key={el.id}>
                { premise.id === el.id ?
                  <div> {premise.premiseName}</div>
                  : ''
                }
              </div>
            )}
          </div>
        </div>
      )}
      {addedCompany.map((el) =>
        <div key={el.companyId}>
          <p>{el.companyName}</p>
          <div>{el.companySites.map((ele) =>
            <div>
              <div>{ele.site}</div>
              <div>{ele.colocation.map((elems) =>
                <div>
                  <div>{elems.premiseName}</div>
                  <div>{elems.rack.map((elements) =>
                    <div>
                      <div>{elements}</div>
                    </div>
                  )}
                  </div>
                </div>
              )}
              </div>
            </div>
          )}</div>
        </div>
      )}
    </Card>
  )
}

export default SingleCompanyPage