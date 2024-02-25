/* eslint-disable max-len */
import {
  SetURLSearchParams,
  useSearchParams,
}                     from 'react-router-dom'

import { Pagination } from 'antd'

type TablePaginationProps = {
  setSearchParams:  SetURLSearchParams;
  currentPage:      string | null;
  documentCount:    number | undefined;
}

const TablePagination = ({currentPage, documentCount}: TablePaginationProps) => {
  const [searchParams, setSearchParams] =  useSearchParams()
  const siteId                    = searchParams.get('siteId')
  const statusId                    = searchParams.get('statusId')
  const searchFilter                    = searchParams.get('search')
  const tableSorter                     = searchParams.get('tableSorter')
  const descending                      = searchParams.get('descending')

  const changePage = async(page: number, limit: number) => {
    if(searchFilter){
      setSearchParams(`page=${page}&limit=${limit}&descending=${descending}&search=${searchFilter}`)
    }else if(siteId){
      setSearchParams(`page=${page}&limit=${limit}&descending=${descending}&siteId=${siteId}`)
    }else if(statusId){
      setSearchParams(`page=${page}&limit=${limit}&descending=${descending}&statusId=${statusId}`)
    }else if(tableSorter){
      setSearchParams(`page=${page}&limit=${limit}&descending=${descending}&tableSorter=${tableSorter}`)
    }else{
      setSearchParams(`page=${page}&limit=${limit}&descending=${descending}`)
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
      {documentCount &&
        <Pagination
          defaultCurrent={Number(currentPage)}
          total={documentCount}
          onChange={changePage}
          showSizeChanger
        />
      }
    </div>
  )
}

export default TablePagination