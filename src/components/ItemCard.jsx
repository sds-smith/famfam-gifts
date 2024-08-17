
import { 
    Card,
    CardHeader,
    Flex,
    Box,
    Heading,
    Text,
    LinkBox,
    LinkOverlay,
    CardBody,
    useColorModeValue,
} from '@chakra-ui/react'

export default function ItemCard({item}) {
  const url = item?.url || '';
  const siteArray = url.split('/');
  const site = siteArray.length >= 3 ? siteArray[2] : '';

  return (
    <>
      { item.url 
        ? (
          <LinkBox>
            <Card w='xs' bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.200')}>
              <CardHeader>
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                      <Heading size='sm'>{item?.name}</Heading>
                      <Text>
                        <LinkOverlay href={item.url} target='_blank' rel='no-referrer'>{site}</LinkOverlay>
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box>
                  <Text>{`${item?.comment}`}</Text>
                </Box>
              </CardBody>
            </Card>
          </LinkBox>
        ) : (
          <Card w='xs' bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.200')}>
           <CardHeader>
             <Flex spacing='4'>
               <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                 <Box>
                   <Heading size='sm'>{item?.name}</Heading>
                   <Text>{site}</Text>
                 </Box>
               </Flex>
             </Flex>
           </CardHeader>
           <CardBody>
             <Box>
               <Text>{`${item?.comment}`}</Text>
             </Box>
           </CardBody>
          </Card>
        )}
    </>
  )
}
