

import React from 'react'
import { AlertDialog, Button, Center, Text } from "native-base";

// <AppModal
//   text={'Upload Image'}
//   header={'Upload Image'}
//   body={'Upload a photo of your product'}
//   btnOneText={'Camera'}
//   btnTwoText={'Gallery'}
//   btnOneFunction={openCamera}
//   btnTwoFunction={openGallery}
// />

const AppModal = ({ text, header, body, btnOneText, btnTwoText, btnOneFunction, btnTwoFunction }) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    return (
        <Center>
            <Text onPress={() => setIsOpen(!isOpen)}>{text}</Text>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>{header}</AlertDialog.Header>
                    <AlertDialog.Body>
                        {body}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="primary" onPress={onClose}>
                                {btnOneText}
                            </Button>
                            <Button colorScheme="primary" onPress={onClose} >
                                {btnTwoText}
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    )
}

export default AppModal
