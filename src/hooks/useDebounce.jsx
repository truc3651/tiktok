import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutRef = setTimeout(() => setDebounceValue(value), delay)
    return () => {
      clearTimeout(timeoutRef)
    }
  }, [value])
  return debounceValue
}

export default useDebounce
