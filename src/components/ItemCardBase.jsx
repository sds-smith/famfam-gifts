
import { 
    Card,
    CardHeader,
    Flex,
    Box,
    Heading,
    Text,
    LinkOverlay,
    CardBody,
    useColorModeValue
} from '@chakra-ui/react';
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
      <Card w='xs' bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.200')} >
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Heading size='sm'>{item?.name}</Heading>
                { Boolean(item.url) && (
                  <Text>
                    <LinkOverlay href={item.url} target='_blank' rel='no-referrer'>{item.url.split('/')[2]}</LinkOverlay>
                  </Text>
                )}
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box>
            <Text>{`${item?.comment || ''}`}</Text>
            {/* { isParent && !userSelectedSelf && <PurchaseWidget item={item} /> } */}
            { userSelectedSelf ? <MyItemControls item={item} /> : <PurchaseWidget item={item} /> }
          </Box>
        </CardBody>
      </Card>
    )
  }