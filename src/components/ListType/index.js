import React from 'react'

import styles from './ListType.module.scss'

const ListType = ({ activeType, value, label, onClickType }) => {
  const typeClassname =
    activeType === value
      ? [styles.Type, styles.TypeActive].join(' ')
      : styles.Type

  return (
    <button
      className={typeClassname}
      onClick={onClickType}
      value={value}
    >
      {label}
    </button>
  )
}

export default ListType
