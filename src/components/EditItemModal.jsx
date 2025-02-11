import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack
  } from '@chakra-ui/react';
  import { useEditList } from '../hooks/useEditList';

  export default function EditItemModal({action, item, isOpen, onClose}) {
    const { submitEdit, addItem } = useEditList();

    const [ name, setName ] = useState(item.name || '');
    const [ url, setUrl ] = useState(item.url || '');
    const [ comment, setComment ] = useState(item.comment || '');
    const [ priority, setPriority ] = useState(item.priority || 10);

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeUrl = (e) => setUrl(e.target.value);
    const handleChangeComment = (e) => setComment(e.target.value);
    const handleChangePriority = (e) => setPriority(e.target.value);

    const resetModalState = () => {
        setName("");
        setUrl("");
        setComment("");
    }

    const submit = {
        Edit: submitEdit,
        Add: addItem
    }

    function handleSubmit(e) {
        e.preventDefault();
        submit[action]({
            id: item.id,
            name,
            url,
            comment,
            priority
        });
        resetModalState();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`${action} ${item.name || 'Item'}`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing={3}>
                    <FormControl>
                        <FormLabel>Item Name</FormLabel>
                        <Input 
                            size='md'
                            value={name}
                            onChange={handleChangeName}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Item URL</FormLabel>
                        <Input 
                            size='md'
                            value={url}
                            onChange={handleChangeUrl}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Comments</FormLabel>
                        <Textarea 
                            size='md'
                            value={comment}
                            onChange={handleChangeComment}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Set Priority</FormLabel>
                        <select 
                            style={{width: '100%'}}
                            name="priority" 
                            id="priority-select"
                            value={priority}
                            onChange={handleChangePriority}
                        >
                          <option ></option>
                          {[1,2,3,4,5,].map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </FormControl>
                </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }