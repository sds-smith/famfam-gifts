
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FamilyMemberCard({member}) {
  const memberParam = member?.displayName.replace(' ', '_');
console.log({member})
  return (
    <Link to={`/home/${memberParam}`}>
      <Card >
        <CardHeader>
          {/* <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'> */}
              <Avatar name={member.displayName} src={member.photoURL}/>
              <Box>
                <Typography >{member?.displayName}</Typography>
                <Typography>{`Items: ${member?.items.length}`}</Typography>
              </Box>
            {/* </Flex>
          </Flex> */}
        </CardHeader>
        <CardContent>
          <Typography>{`Items: ${member?.items.length}`}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
