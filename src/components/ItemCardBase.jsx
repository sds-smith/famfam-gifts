

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PurchaseWidget from './PurchaseWidget';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';
import MyItemControls from './MyItemControls';
import { Item } from './Item';

export default function ItemCardBase({item}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({id: item.id});

  const { currentUser } = useAuthContext();
  const selectedFamilyMember = useFamilyMemberParam();

  const isParent = currentUser?.role === 'parent';
  const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;
    
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'absolute',
    top: '15',
    right: '15'
  };

  return (
    <Card 
      sx={{position: 'relative', background: '#F3F4F9'}}
    >
      { userSelectedSelf && <Item item={item} id={item.id} style={style} {...attributes} {...listeners}><DragIndicatorIcon/></Item>}
      <CardHeader
        title={item?.name}
        subheader={!!item?.price ? `Price: $${item?.price}` :  ''}
        sx={{width: '80%'}}
      />
      <CardContent>
        <Box>
          { !!item.category && <Typography>{`Category: ${item.category}`}</Typography>}
           { Boolean(item.url) && (
                <Typography sx={{color: 'blue', textDecoration: 'underline', zIndex: '100'}}>
                  {item.url.split('/')[2]}
                </Typography>
              )}
          <Typography>{`${item?.comment || ''}`}</Typography>
          { userSelectedSelf ? <MyItemControls item={item} /> : <PurchaseWidget item={item} /> }
        </Box>
      </CardContent>
    </Card>
  )
}