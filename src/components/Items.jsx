
import { VStack } from '@chakra-ui/react'
import ItemCard from './ItemCard'

export default function Items({ items }) {
    return (
        <VStack spacing={4}>
            { items?.map(item => (
                <ItemCard key={item.name} item={item} />
            ))}
        </VStack>
      )
}
