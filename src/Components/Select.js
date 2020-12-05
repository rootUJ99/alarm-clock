import React from 'react'

const Select = ({options, ...rest}) => {
  return (
    <select {...rest} className="select">
      {
        options.map(it=> (
          <option key={it} value={it}>
            {it}
          </option>
        ))
      }
      <option></option>
    </select>
  )
}

export default Select
