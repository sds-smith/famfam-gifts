

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PurchaseWidget from './PurchaseWidget';
import { useAuthContext } from '../context/AuthContext';
import { useFamilyMemberParam } from '../hooks/useFamilyMemberParam';
import MyItemControls from './MyItemControls';

const priorityColors = {
  1: 'rgba(66, 245, 245, 0.1)',
  2: 'rgba(66, 245, 129, 0.1)',
  3: 'rgba(221, 245, 66, 0.1)',
  4: 'rgba(245, 164, 66, 0.1)',
  5: 'rgba(245,  66, 66, 0.1)',
}

export default function ItemCardBase({item}) {
  const { currentUser } = useAuthContext();
  const selectedFamilyMember = useFamilyMemberParam();

  const isParent = currentUser?.role === 'parent';
  const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

  const borderColor = priorityColors[item?.priority] || 'purple';

  return (
    <Card 
      sx={{backgroundColor: borderColor}}
    >
      <CardHeader
        title={item?.name}
        subheader={item?.priority <= 5 ? `Priority Level: ${item?.priority}` :  ''}
      />
      <CardContent>
        <Box>
           { Boolean(item.url) && (
                <Typography sx={{color: 'blue', textDecoration: 'underline'}}>
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