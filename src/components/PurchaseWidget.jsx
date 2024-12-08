
import { Button, Tag, useColorModeValue } from '@chakra-ui/react';
import { useEditList } from '../hooks/useEditList';

export default function PurchaseWidget({ item }) {
    const { purchased, purchasedBy } = item;
    const { markItemPurchased, undoPurchase } = useEditList();

  return (
    <>
        { purchased
            ? <Button onClick={() => undoPurchase(item)} >
                <Tag variant='solid' colorScheme='cyan'>{`Purchased by ${purchasedBy?.displayName}`}</Tag>
              </Button>
            : <Button colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')} onClick={() => markItemPurchased(item)}>Mark Purchased</Button>
        }
    </>
  )
}
