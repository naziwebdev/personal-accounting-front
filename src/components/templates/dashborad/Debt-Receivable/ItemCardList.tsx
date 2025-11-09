import React from 'react'
import ItemCard from './ItemCard'

export default function ItemCardList() {
  return (
  <div className="flex justify-center items-center flex-wrap gap-6">
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
    <ItemCard/>
  </div>
  )
}
