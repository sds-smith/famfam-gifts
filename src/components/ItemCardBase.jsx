
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

const borderColor = {
  lightModeValue: {
    1:  'cyan.100',
    2:  'teal.100',
    3:  'green.200',
    4:  'yellow.200',
    5:  'orange.200',
    // 10: 'blackAlpha.50'
    10: 'rgba(0, 0, 0, 0.1)'
  },
  darkModeValue: {
    1:  'cyan.700',
    2:  'teal.700',
    3:  'green.700',
    4:  'yellow.700',
    5:  'orange.700',
    // 10: 'whiteAlpha.200'
    10: 'rgba(0, 0, 0, 0.1)'
  }
}

export default function ItemCardBase({item}) {
  const { currentUser } = useAuthContext();
  const selectedFamilyMember = useFamilyMemberParam();

  const isParent = currentUser?.role === 'parent';
  const userSelectedSelf = currentUser?.uid === selectedFamilyMember?.uid;

  return (
    <Card 
      w='xs' 
      bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.200')} 
      borderWidth={item.priority !== 10 && '0px 1px 4px 0px'}
      borderColor={useColorModeValue(borderColor.lightModeValue[item.priority], borderColor.darkModeValue[item.priority])}
    >
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <Heading size='md' >{item?.name}</Heading>
              { item?.priority <= 5 &&
                <Heading size='sm' fontWeight='semibold'>{`Priority Level: ${item?.priority}`}</Heading> 
              }
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
          { userSelectedSelf ? <MyItemControls item={item} /> : <PurchaseWidget item={item} /> }
        </Box>
      </CardBody>
    </Card>
  )
}