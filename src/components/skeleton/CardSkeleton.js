import { Center, Skeleton, Stack, VStack } from "native-base";


export const CardSkeleton = () => {
    return <Center mt={5} w="350">
        <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: 'coolGray.500'
        }} _light={{
            borderColor: 'coolGray.200'
        }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Stack width="50%">
                <Skeleton px="4" my="4" startColor="blue.100" />
            </Stack>
        </VStack>
    </Center>
};