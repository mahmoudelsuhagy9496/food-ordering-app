"use client"

import { Store } from "@/redux/store"
import { Provider } from "react-redux"

export default function ReduxProvider({children,}:{children:React.ReactNode}) {
  return (
<Provider store={Store}>{children}</Provider>  )
}
