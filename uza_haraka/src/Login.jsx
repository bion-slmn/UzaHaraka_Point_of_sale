  import {
	Box,
	Button,
	Card,
	CardBody,
	Center,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';

function LogInForm() {
	return (
		<>
		<Center>
			<Card bg="facebook"  spacing="6" mt="8" variant="outline" shadow={'lg'} w="450px">
				<CardBody>
					<Stack spacing="4">
						<VStack as="header" spacing="6" mt="8">
							<Heading
								as="h1"
								fontSize="30px"
								letterSpacing="-0.5px"
								color="#2da44e"
								fontWeight="bold"
							>
								Welcome to UzaHaraka
							</Heading>
						</VStack>
						<Stack />
						<form>
							<Stack spacing="4">
								<FormControl>
									<FormLabel size="sm">Username</FormLabel>
									<Input
										type="text"
										bg="white"
										borderColor="#d8dee4"
										size="sm"
										borderRadius="6px" />
								</FormControl>
								<FormControl>
									<HStack justify="space-between">
										<FormLabel size="sm">Password</FormLabel>
										<Button
											as="a"
											href="#"
											variant="link"
											size="xs"
											color="#0969da"
											fontWeight="500"
										>
											Forgot password?
										</Button>
									</HStack>
									<Input
										type="password"
										bg="white"
										borderColor="#d8dee4"
										size="sm"
										borderRadius="6px" />
								</FormControl>

								<Button
									bg="#2da44e"
									color="white"
									size="sm"
									_hover={{ bg: '#2c974b' }}
									_active={{ bg: '#298e46' }}
									as={'a'} href='/dashboard'
								>
									Sign in
								</Button>
							</Stack>
						</form>
					</Stack>
				</CardBody>
			</Card>
		</Center><Center as="footer" mt="16">
				<HStack spacing="4" pt="2">
					<Link isExternal color="#0969da" href="#" fontSize="xs">
						Terms
					</Link>
					<Link isExternal color="#0969da" href="#" fontSize="xs">
						Privacy
					</Link>
					<Link isExternal color="#0969da" href="#" fontSize="xs">
						Security
					</Link>
					<Link isExternal href="#" fontSize="s">
						 UzaHaraka
					</Link>
				</HStack>
			</Center>
		</>
	);
}

export default LogInForm;
