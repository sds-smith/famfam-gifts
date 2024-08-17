import React from 'react'

export default function Items({ items }) {
    console.log('[Items]',{items})
  return (
    <>
        <div>Items</div>
        { items?.map(item => (
            <div>{item.name}</div>
        ))}
    </>
  )
}
