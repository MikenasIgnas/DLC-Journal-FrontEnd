import { Pagination }       from 'antd'
import { useSearchParams }  from 'react-router-dom'

type CompaniesPaginationProps = {
    companiesCount: number | undefined
}

const CompaniesPagination = ({companiesCount}: CompaniesPaginationProps) => {
  const [searhParams, setSearchParams] = useSearchParams()
  const currentPage = searhParams.get('page')
  const name = searhParams.get('name')
  const changePage = async(page: number, limit: number) => {
    if(!name){
      setSearchParams(`page=${page}&limit=${limit}`)
    }else{
      setSearchParams(`page=${page}&limit=${limit}&name=${name}`)
    }
  }
  return (
    <>
      {companiesCount &&
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
      <Pagination
        defaultCurrent={Number(currentPage)}
        total={companiesCount}
        onChange={changePage}
        showSizeChanger
      />
    </div>
      }
    </>
  )
}

export default CompaniesPagination