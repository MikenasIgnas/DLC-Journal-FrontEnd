import { StatusType } from '../../../types/globalTypes'

const statusMap: { [key: string]: StatusType } = {
  Pradėtas:  'success',
  Paruoštas: 'processing',
  Baigtas:   'error',
}

export default statusMap