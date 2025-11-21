

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

export default function ItemCardBase({item}) {
  const { currentUser } = useAuthContext();
  const selectedFamilyMember = useFamilyMemberParam();

  const isParent = currentUser?.role === 'parent';
  const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

  return (
    <Card >
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