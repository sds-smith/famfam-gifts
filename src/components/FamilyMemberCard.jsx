
import { Link } from 'react-router-dom'
import { 
    Card,
    CardHeader,
    Flex,
    Avatar,
    Box,
    Heading,
    Text,
    CardBody,
    useColorModeValue,
} from '@chakra-ui/react'

export default function FamilyMemberCard({member}) {
  const memberParam = member?.displayName.replace(' ', '_');

  return (
    <Link to={`/home/${memberParam}`}>
      <Card w='xs' bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.200')} >
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={member.displayName} src={member.photoUrl}/>
              <Box>
                <Heading size='sm'>{member?.displayName}</Heading>
                <Text>{`Items: ${member?.items.length}`}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{`Items: ${member?.items.length}`}</Text>
        </CardBody>
      </Card>
    </Link>
  )
}
