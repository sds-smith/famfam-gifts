

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
    <Card 
      w='xs' 
      borderWidth={item.priority !== 10 && '0px 1px 4px 0px'}
    >
      <CardHeader>
            <Box>
              <Typography size='md' >{item?.name}</Typography>
              { item?.priority <= 5 &&
                <Typography size='sm' fontWeight='semibold'>{`Priority Level: ${item?.priority}`}</Typography> 
              }
              { Boolean(item.url) && (
                <Typography>
                  <Link href={item.url} target='_blank' rel='no-referrer'>{item.url.split('/')[2]}</Link>
                </Typography>
              )}
            </Box>
      </CardHeader>
      <CardContent>
        <Box>
          <Typography>{`${item?.comment || ''}`}</Typography>
          { userSelectedSelf ? <MyItemControls item={item} /> : <PurchaseWidget item={item} /> }
        </Box>
      </CardContent>
    </Card>
  )
}