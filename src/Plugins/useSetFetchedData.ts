import { useCookies }           from 'react-cookie'
import { get }                  from './helpers'
import { useAppDispatch }       from '../store/hooks'
import { useSearchParams }      from 'react-router-dom'
import { setFetchedTableData }  from '../auth/FetchedDataReducer/fetchedTableDataReducer'

const useSetFetchedData = () => {
  const [cookies] =           useCookies(['access_token'])
  const dispatch =            useAppDispatch()
  const [, setSearchParams] = useSearchParams()

  const setFetchedData = async (
    url: string,
    page: string | null,
    limit: string | null,
    searchFilter: string | null,
    visitStatusFilter: string | null
  ) => {
    if (!page || !limit) {
      setSearchParams(`page=${page}&limit=${limit}`)
    }

    let fetchUrl = `${url}?page=${page}&limit=${limit}`
    let paginationParams = `page=${page}&limit=${limit}`

    if (searchFilter) {
      fetchUrl += `&filter=${searchFilter}`
      paginationParams += `&filter=${searchFilter}`
    }

    if (visitStatusFilter) {
      fetchUrl += `&selectSorter=${visitStatusFilter}`
      paginationParams += `&selectSorter=${visitStatusFilter}`
    }

    try {
      const data = await get(fetchUrl, cookies.access_token)
      setSearchParams(paginationParams)
      dispatch(setFetchedTableData(data))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return setFetchedData
}

export default useSetFetchedData