/* eslint-disable max-len */
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Breadcrumb }        from 'antd'
import { HomeOutlined }      from '@ant-design/icons'
import { useAppSelector } from '../../store/hooks'

const BreadcrumbsLinks = () => {
  const location        = useLocation()
  const decodedPath     = decodeURIComponent(location.pathname)
  const pathParts       = decodedPath.split('/').slice(1)
  const lastPath        = pathParts[pathParts.length - 1]
  const [searchParams]  = useSearchParams()
  const siteId          = searchParams.get('siteId')
  const isSecurity      = useAppSelector((state) => state.auth.isSecurity)
  const items = [
    {
      title: <Link to={isSecurity ? `/DLC Žurnalas?menuKey=1&siteId=${siteId}` : '/DLC Žurnalas?menuKey=1'}><HomeOutlined/></Link>,
    },
  ]

  const pathItems = pathParts.map((el, index) => ({
    title: lastPath !== el && el !== 'Mano_Profilis' ?
      <Link to={isSecurity ?
        `/${pathParts.slice(0, index + 1).map(encodeURIComponent).join('/')}?page=1&limit=10&descending=true&siteId=${siteId}`
        :
        `/${pathParts.slice(0, index + 1).map(encodeURIComponent).join('/')}?page=1&limit=10&descending=true`}>{decodeURIComponent(el)}
      </Link> :
      <span style={{textDecoration: 'underline'}}>{el}</span>,
  }))

  items.push(...pathItems)

  return (
    <Breadcrumb items={items}/>
  )
}

export default BreadcrumbsLinks