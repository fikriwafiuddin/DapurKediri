// src/hooks/useHydratedStore.ts
import { useEffect, useState } from "react"
import { StoreApi, UseBoundStore } from "zustand"

// Hook ini berfungsi untuk memastikan data persistensi HANYA diambil
// di sisi klien (setelah mounting) untuk menghindari Hydration Mismatch di Next.js SSR.
function useHydratedStore<T, F>(
  store: UseBoundStore<StoreApi<T>>,
  callback: (state: T) => F
) {
  // 1. Ambil state dari store
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = store(callback as any) as F

  // 2. Simpan state di state React (local state)
  const [data, setData] = useState<F | undefined>()

  // 3. Hanya update state React setelah komponen mounted (client-side)
  useEffect(() => {
    setData(result)
  }, [result])

  // Kembalikan data yang hanya terdefinisi di client.
  // Di Server-Side Render (SSR), data akan menjadi 'undefined'.
  return data
}
export default useHydratedStore

/*
Catatan:
- Kita menggunakan 'as any' pada callback karena TypeScript terkadang
  bermasalah dengan inferensi tipe penuh saat menggunakan callback.
- Tipe pengembalian kini bisa berupa 'T | undefined' untuk mencerminkan 
  bahwa saat SSR, data belum siap.
*/
