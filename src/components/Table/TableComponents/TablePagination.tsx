/* eslint-disable max-len */
import React                                    from 'react'
import { SetURLSearchParams, useSearchParams }  from 'react-router-dom'
import { Pagination }                           from 'antd'

type TablePaginationProps = {
  setSearchParams:  SetURLSearchParams;
  currentPage:      string | null;
  documentCount:    number | undefined;
}

const TablePagination = ({currentPage, documentCount}: TablePaginationProps) => {
  const [searchParams, setSearchParams] =  useSearchParams()
  const selectFilter = searchParams.get('selectFilter')
  const changePage = async(page: number, limit: number) => {
    if(selectFilter){
      setSearchParams(`page=${page}&limit=${limit}&selectFilter=${selectFilter}`)
    }else{
      setSearchParams(`page=${page}&limit=${limit}`)
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