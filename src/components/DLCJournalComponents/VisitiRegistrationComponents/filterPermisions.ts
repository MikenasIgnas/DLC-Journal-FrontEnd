import { VisitorsType } from '../../../types/globalTypes'

export default (visitors?: VisitorsType[]) => {
  const filteredVisits: string[] = []
  visitors?.map(({ selectedVisitor: { permissions } }) => {
    permissions.map(item => {
      if ( !filteredVisits.includes(item)) {
        filteredVisits.push(item)
      }
    })
  })
  return filteredVisits
}