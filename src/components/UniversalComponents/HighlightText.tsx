const HighlightText = (filter: string | null, text: string | undefined) => {
  if (!filter) {
    return <div>{text}</div>
  }

  const regex = new RegExp(`(${filter})`, 'gi')
  const parts = text?.split(regex)

  return (
    <div style={{display: 'flex'}}>
      {parts?.map((part, index) =>
        regex.test(part) ? (
          <div key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </div>
        ) : (
          part
        )
      )}
    </div>
  )
}

export default HighlightText