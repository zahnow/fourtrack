import { useRef } from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

function GenericDeleteAlert({ isOpen, onClose, header, body, deleteFunction }) {
    const cancelRef = useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {header}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {body}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={deleteFunction} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

export default GenericDeleteAlert;