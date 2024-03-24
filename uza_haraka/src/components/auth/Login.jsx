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
import { useRef, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckButton from "react-validation/build/button";
import { login } from "../../actions/auth";
import { useForm } from "react-hook-form";

const LogInForm = () => {
	const form = useRef()
	const checkBtn = useRef()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const { isLoggedIn } = useSelector((state) => state.auth)
	const { message } = useSelector((state) => state.message)
	const dispatch = useDispatch()

	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleLogin = (e) => {
		e.preventDefault()

		setLoading(true);

		form.current.validateAll();
		if (checkBtn.current.context._errors.length === 0) {
			dispatch(login(username, password))
				.then(() => {
					navigate("/dashboard");
					window.location.reload();
				})
				.catch(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	};
	if (isLoggedIn) {
		return <Navigate to="/dashboard" />;
	}


	return (
		<VStack as="form" spacing="4" onSubmit={handleLogin} ref={form}>
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
											value={username}
											autoComplete='off'
											required
											onChange={onChangeUsername}
										/>

									</FormControl>
									<FormControl>
										<HStack justify="space-between">
											<FormLabel size="sm">Password</FormLabel>
											<Input
												type="password"
												name='password'
												value={password}
												onChange={onChangePassword}
												required
											/>

										</HStack>
									</FormControl>

									<Button
										bg="#2da44e"
										color="white"
										size="sm"
										_hover={{ bg: '#2c974b' }}
										_active={{ bg: '#298e46' }}
										onClick={handleLogin}
										disabled={loading}
									>
										{loading && (<span className="spinner-border spinner-border-sm"></span>)}
										Sign in
									</Button>
									{message && (
										<div className="col-12">
											<div className="alert alert-danger" role="alert">
												{message}
											</div>
										</div>
									)}
								</Stack>
								<CheckButton style={{ display: "none" }} ref={checkBtn} />
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
