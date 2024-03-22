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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';


import { authActions } from '../src/components/store'

function LogInForm() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Username is required'),
		password: Yup.string().required('Password is required')
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// get functions to build form with useForm() hook
	const { register, handleSubmit, formState } = useForm(formOptions);
	const { errors, isSubmitting } = formState;

	function onSubmit({ username, password }) {
		return dispatch(authActions.login({ username, password }));
	}
	return (
		<>
			<Center>
				<Card bg="facebook" spacing="6" mt="8" variant="outline" shadow={'lg'} w="450px">
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
									<FormControl onSubmit={handleSubmit(onSubmit)}>
										<FormLabel size="sm">Username</FormLabel>
										<Input
											type="text"
											bg="white"
											borderColor="#d8dee4"
											size="sm"
											borderRadius="6px"
											value={username}
											onChange={(e) => {
												setUsername(e.target.value);
											}} />
										<div className="invalid-feedback">{errors.username?.message}</div>
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
												value={password}
												onChange={(e) => setPassword(e.target.value)}
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
										<div className="invalid-feedback">{errors.password?.message}</div>
									</FormControl>

									<Button
										bg="#2da44e"
										color="white"
										size="sm"
										_hover={{ bg: '#2c974b' }}
										_active={{ bg: '#298e46' }}
										onClick={handleSubmit}
										as={'a'} href='/dashboard'
										disabled={isSubmitting} className="btn btn-primary">
										{isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
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
