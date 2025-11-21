
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function FamilyMemberCard({member}) {
  const memberParam = member?.displayName.replace(' ', '_');
  const [first, last] = member?.displayName.split(' ');
  const initials = `${first.slice(0,1)}${last.slice(0,1)}`

  return (
    <Link 
      to={`/home/${memberParam}`}
      style={{textDecoration: 'none'}}
    >
      <Card >
        <CardHeader
          avatar={<Avatar alt={member.displayName || 'First Last'} src={member.photoURL}>{initials}</Avatar>}
          title={member?.displayName}
        />
        <CardContent>
          <Typography>{`Items: ${member?.items.length}`}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
