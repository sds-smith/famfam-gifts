
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function MyItemControls() {
  return (
    <ButtonGroup variant='outline' spacing='6'>
      <Button colorScheme='blue'>Edit</Button>
      <Button colorScheme='red'>Delete</Button>
    </ButtonGroup>
  )
}