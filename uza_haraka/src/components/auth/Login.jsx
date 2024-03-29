import {
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
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react'


function LogInForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);


	const handleLogin = async (e) => {
		e.preventDefault();
		console.log(username, password)
		try {
			const response = await fetch('http://localhost:8000/user/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// 'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token from cookie
				},

				// credentials: 'include', // Include cookies in the request
				body: JSON.stringify({
					username: username,
					password: password
				  })
			});


			if (!response.ok) {
				// Handle error responses from the server
				setError('Invalid username or password');
				return;
			}

			const responseData = await response.json();
			// Assuming server responds with a username and profile pic
			const { username: responseDataUsername, profilePic } = responseData;
			console.log(username, profilePic)
			
			// Do something with the user data, like storing in local storage
			localStorage.setItem('username', responseDataUsername);
			localStorage.setItem('profilePic', profilePic);

			// Redirect or do whatever you need upon successful login
			// For example, redirect to a dashboard page
			window.location.href = '/dashboard';
		} catch (error) {
			console.error('Error during login:', error);
			setError('An error occurred during login');
			console.log(error)
		}
	};
	// Function to get CSRF token from cookies
	// function getCookie(name) {
	// 	const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
	// 	return cookieValue ? cookieValue.pop() : '';
	// }

	return (
		<VStack >
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
							<form onSubmit={handleLogin}>
								<Stack spacing="4">
									<FormControl>
										<FormLabel size="sm">Username</FormLabel>
										<Input
											type="text"
											bg="white"
											borderColor="#d8dee4"
											size="sm"
											borderRadius="6px"
											value={username}
											autoComplete='off'
											required
											onChange={(e) => setUsername(e.target.value)}
										/>

									</FormControl>
									<FormControl>
										<FormLabel size="sm">Password</FormLabel>
										<Input
											type="password"
											name='password'
											size={'sm'}
											bg="white"
											borderColor="#d8dee4"
											borderRadius="6px"

											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</FormControl>

									<Button
										bg="#2da44e"
										color="white"
										size="sm"
										_hover={{ bg: '#2c974b' }}
										_active={{ bg: '#298e46' }}
										type='submit'

									>

										Sign in
									</Button>
									{error && <p>{error}</p>}
								</Stack>
							</form>
						</Stack>
					</CardBody>
				</Card>
			</Center>
			<Center as="footer" mt="16">
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
		</VStack>
	);
};

export default LogInForm;
