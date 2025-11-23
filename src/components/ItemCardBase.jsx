

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
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

const priorityColors = {
  1: 'rgba(66, 245, 245, 0.1)',
  2: 'rgba(66, 245, 129, 0.1)',
  3: 'rgba(221, 245, 66, 0.1)',
  4: 'rgba(245, 164, 66, 0.1)',
  5: 'rgba(245,  66, 66, 0.1)',
}

export default function ItemCardBase({item}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: item.id});

  const { currentUser } = useAuthContext();
  const selectedFamilyMember = useFamilyMemberParam();

  const isParent = currentUser?.role === 'parent';
  const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

  const borderColor = priorityColors[item?.priority] || 'purple';

    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

  return (
    <Card 
      sx={{backgroundColor: borderColor}}
    >
      <Item item={item} id={item.id} style={style} {...attributes} {...listeners}><DragIndicatorIcon/></Item>
      <CardHeader
        title={item?.name}
        subheader={item?.priority <= 5 ? `Priority Level: ${item?.priority}` :  ''}
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