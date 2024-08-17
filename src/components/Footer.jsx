
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import SignInOutButton from './SignInOutButton';
import { useAuthContext } from '../context/AuthContext';

export default function Footer() {
    const { currentUser } = useAuthContext();

    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position='absolute' right={0} bottom={0}>
          <Flex h={16} alignItems={'center'} justifyContent={'center'}>
            <HStack spacing={12} alignItems={'center'}>
              <Box>{ currentUser?.displayName }</Box>
            </HStack>
            <Flex></Flex>
          </Flex>
        </Box>
      </>
    )
}