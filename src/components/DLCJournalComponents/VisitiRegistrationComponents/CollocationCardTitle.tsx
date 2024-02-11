import { Tag } from 'antd'

type CollocationCardTitleProps = {
  premise: string | undefined
  hasMatchingRacks: boolean | undefined
}

const CollocationCardTitle = ({ premise, hasMatchingRacks }: CollocationCardTitleProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>{premise}</div>
      {hasMatchingRacks ? <Tag>Reikalinga DLC inžinieriaus palyda</Tag> : null}
    </div>
  )
}

export default CollocationCardTitle
