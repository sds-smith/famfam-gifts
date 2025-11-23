
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useEditList } from '../hooks/useEditList';

export default function PurchaseWidget({ item }) {
    const { purchased, purchasedBy } = item;
    const { markItemPurchased, undoPurchase } = useEditList();

    const markPurchased = (e) => {
      e.preventDefault();
      e.stopPropagation();
      markItemPurchased(item)
    }

    const unMarkPurchased = (e) => {
      e.preventDefault();
      e.stopPropagation();
      undoPurchase(item)
    }

  return (
    <>
        { purchased
            ? <Button onClick={unMarkPurchased} >
                <Chip variant='filled' label={`Purchased by ${purchasedBy?.displayName}`} color="success"/>
              </Button>
            : <Button variant="contained" sx={{backgroundColor: 'gray'}} onClick={markPurchased}>Mark Purchased</Button>
        }
    </>
  )
}
