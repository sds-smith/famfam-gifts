
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useEditList } from '../hooks/useEditList';

export default function PurchaseWidget({ item }) {
    const { purchased, purchasedBy } = item;
    const { markItemPurchased, undoPurchase } = useEditList();

  return (
    <>
        { purchased
            ? <Button onClick={() => undoPurchase(item)} >
                <Chip variant='solid' colorScheme='cyan'>{`Purchased by ${purchasedBy?.displayName}`}</Chip>
              </Button>
            : <Button onClick={() => markItemPurchased(item)}>Mark Purchased</Button>
        }
    </>
  )
}
