import { useState } from "react"

export default function useSearchFilter(data) {
    const [input, setInput] = useState('')
    if (!data || data.length === 0) {
        return [[], setInput]
    }
    function filterByValue(array, input) {
        return array.filter(o => Object.keys(o).some(k => o[k]?.toLowerCase().includes(input.toLowerCase())))
    }
    const filtered = filterByValue(data, input)
    return [filtered, setInput]
}