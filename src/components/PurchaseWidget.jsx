
import { Button, Tag, useColorModeValue } from '@chakra-ui/react'

export default function PurchaseWidget({ item }) {
    const { purchased, purchasedBy } = item;

  return (
    <>
        { purchased
            ? <Tag variant='solid' colorScheme='cyan'>{`Purchased by ${purchasedBy?.displayName}`}</Tag>
            : <Button colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')}>Mark Purchased</Button>
        }
    </>
  )
}
