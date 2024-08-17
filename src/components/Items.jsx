
import ItemCard from './ItemCard'

export default function Items({ items }) {
    console.log('[Items]',{items})
    return (
        <>
            { items?.map(item => (
                <ItemCard key={item.name} item={item} />
            ))}
        </>
      )
}
