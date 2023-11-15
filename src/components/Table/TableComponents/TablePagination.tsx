/* eslint-disable max-len */
import React                                    from 'react'
import { Box }                                  from '@mui/joy'
import { iconButtonClasses }                    from '@mui/joy/IconButton'
import { SetURLSearchParams, useSearchParams }  from 'react-router-dom'
import { Pagination }                           from 'antd'
import { get }                                  from '../../../Plugins/helpers'
import { useCookies }                           from 'react-cookie'

type TablePaginationProps = {
  setSearchParams:  SetURLSearchParams;
  currentPage:      string | null;
  getDocumentCount: string;
}

const TablePagination = ({currentPage, setSearchParams, getDocumentCount}: TablePaginationProps) => {
  const [searchParams] =                      useSearchParams()
  const filter =                              searchParams.get('filter')
  const [cookies] =                           useCookies(['access_token'])
  const [documentCount, setDocumentCount] =   React.useState<number | undefined>()

  React.useEffect(() => {
    (async () => {
      try{
        const documents = await get(`${getDocumentCount}`, cookies.access_token)
        setDocumentCount(documents.data)
      }catch(err){
        console.log(err)
      }
    })()
  }, [])

  const changePage = (page: number, limit: number) => {
    setSearchParams(`page=${page}&limit=${limit}&filter=${filter}`)
  }
  return (
    <>
      {documentCount &&
        <Pagination
          defaultCurrent={Number(currentPage)}
          total={documentCount}
          onChange={changePage}
          showSizeChanger
        />
      }
    </>
  )
}

export default TablePagination