/* eslint-disable max-len */
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb }        from 'antd'
import { HomeOutlined }      from '@ant-design/icons'

const BreadcrumbsLinks = () => {
  const location        = useLocation()
  const decodedPath     = decodeURIComponent(location.pathname)
  const pathParts       = decodedPath.split('/').slice(1)
  const lastPath        = pathParts[pathParts.length - 1]
  const items = [
    {
      title: <Link to={'/DLC Žurnalas?menyKey=1'}><HomeOutlined/></Link>,
    },
  ]
  const pathItems = pathParts.map((el, index) => ({
    title: lastPath !== el && el !== 'Mano_Profilis' ?
      <Link to={`/${pathParts.slice(0, index + 1).map(encodeURIComponent).join('/')}?page=1&limit=10&descending=true`}>{decodeURIComponent(el)}</Link> :
      <span style={{textDecoration: 'underline'}}>{el}</span>,
  }))

  items.push(...pathItems)

  return (
    <Breadcrumb items={items}/>
  )
}

export default BreadcrumbsLinks