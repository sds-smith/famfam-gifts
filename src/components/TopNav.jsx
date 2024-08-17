
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

export default function TopNav() {
    const { currentUser } = useAuthContext();

    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack spacing={8} alignItems={'center'}>
              <Box>FamFam Gift Reg</Box>
            </HStack>
            <Flex alignItems={'center'}>
              <SignInOutButton /> 
              <Avatar
                size={'sm'}
                src={ currentUser?.photoURL }
              />
            </Flex>
          </Flex>
        </Box>
      </>
    )
}