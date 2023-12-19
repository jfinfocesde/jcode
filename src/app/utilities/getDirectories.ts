import { typeLink } from "../features/links/links";

export async function getDirectories(endpoint: string) {
    const res = await fetch(`http://localhost:3000/api/search?path=${endpoint}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const json = await res.json();
    const result: typeLink[] = await json.message.map((item: string) => {
        return {
            label: item,
            path: `${endpoint}/${item}`
        }
    })
    return result
}