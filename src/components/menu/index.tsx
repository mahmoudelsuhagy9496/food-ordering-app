/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from '@/lib/formtter'
import Image from 'next/image'
import React from 'react'
import AddToCartButton from './AddToCartButton'

export default function Menu({items}:{items:any}) {
  return (
    <div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <div className=" p-5 rounded-2xl bg-gray-300 hover:bg-white border-2 ">
            <div className=" w-48 h-48 relative mx-auto">
              <Image src={item.image} alt={item.name} fill className=" object-cover" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className=" font-semibold my-3 text-xl">{item.name}</h2>
              <strong className=" text-accent">{formatCurrency(item.basePrice)}</strong>
             

            </div>
            <p className=" text-gray-500 text-sm line-clamp-3">{item.description}</p>
            <div className="flex justify-center items-center">
              <AddToCartButton item={item} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}
