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
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const LogInForm = () => {
	const userRef = useRef()
	const errRef = useRef()
	const [user, setUser] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const navigate = useNavigate()

	const [login, { isLoading }] = useLoginMutation()
	const dispatch = useDispatch()

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [user, pwd])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const userData = await login({ user, pwd }).unwrap()
			dispatch(setCredentials({ ...userData, user }))
			setUser('')
			setPwd('')
			navigate('/welcome')
		} catch (err) {
			if (!err?.originalStatus) {
				// isLoading: true until timeout occurs
				setErrMsg('No Server Response');
			} else if (err.originalStatus === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.originalStatus === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	}

	const handleUserInput = (e) => setUser(e.target.value)

	const handlePwdInput = (e) => setPwd(e.target.value)

	const content = isLoading ? <h1>Loading...</h1> : (
		<VStack as="form" spacing="4" onSubmit={handleSubmit}>
			<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

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
									<FormControl>
										<FormLabel size="sm">Username</FormLabel>
										<Input
											type="text"
											bg="white"
											borderColor="#d8dee4"
											ref={useRef}
											size="sm"
											borderRadius="6px"
											value={user}
											autoComplete='off'
											required
											onChange={handleUserInput}
										/>
										
									</FormControl>
									<FormControl>
										<HStack justify="space-between">
											<FormLabel size="sm">Password</FormLabel>
											<Input
												type="password"
												value={pwd}
												onChange={handlePwdInput}
												required
											/>

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
										onClick={handleSubmit}
										as={'a'} href='/dashboard'
									>
										Sign in
									</Button>
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
	)

	return content

}

export default LogInForm;
