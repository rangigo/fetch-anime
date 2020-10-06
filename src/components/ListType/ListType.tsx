import React from 'react'

import styles from './ListType.module.scss'

interface ListTypeProps {
  activeType: string
  value: string
  label: string
  onClickType: (e: React.MouseEvent<HTMLButtonElement>) => void | undefined
}

const ListType = ({ activeType, value, label, onClickType }: ListTypeProps) => {
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
