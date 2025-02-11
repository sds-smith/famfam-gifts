import { useColorMode } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

export default function ColorModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <header>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </header>
    )
  }