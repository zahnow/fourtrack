import { useState } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';

function GenericModalInput({ isOpen, onClose, header, label, buttonText, retFunction }) {
    const [input, setInput] = useState('');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>{label}</FormLabel>
                        <Input
                            type="text"
                            name={label}
                            value={input}
                            required
                            placeholder='Username'
                            onChange={(event) => setInput(event.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => retFunction(input)} colorScheme='green' mr={3}>
                        {buttonText}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GenericModalInput