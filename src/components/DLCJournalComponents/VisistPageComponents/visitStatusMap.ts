import { StatusType } from '../../../types/globalTypes'

const statusMap: { [key: string]: StatusType } = {
  Pradėti:  'success',
  Paruošti: 'processing',
  Baigti:   'error',
}

export default statusMap