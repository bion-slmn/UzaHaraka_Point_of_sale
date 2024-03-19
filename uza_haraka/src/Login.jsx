//FormExample.jsx 
import { 
	Box, 
	Button, 
	Flex, 
	FormControl, 
	FormLabel, 
	Input, 
	Text, 
	useToast, 
} from "@chakra-ui/react"; 
import React from "react"; 
import { useState } from "react"; 

const LogInForm = () => { 
	const toast = useToast(); 
	const [email, setEmail] = useState(""); 
	const [password, setPassword] = useState(""); 
	
	return ( 
		<Box className="col-span-3 w- h-auto 
						shadow-gray-400 border 
						shadow-xl 
						rounded-xl lg:p-4"> 
			<Box className="p-4"> 
				<Text className="text-center text-3xl 
								text-bold 
								text-blue-700"> 
					Welcome to UzaHaraka POS 
				</Text> 

				<Box className="grid md:grid-cols-2 
								gap-4 w-full py-6"> 
					<Flex className="flex-col py-2"> 
						<FormControl> 
							<FormLabel textColor={'black'}> 
								Email address 
							</FormLabel> 
							<Input 
								type="email"
								onChange={(e) => { 
									setEmail(e.target.value); 
								}} 
							/> 
						</FormControl> 
					</Flex> 
					<Flex flexDirection={"column"} 
						className="py-2"> 
						<FormControl> 
							<FormLabel textColor={'black'}> 
								Password 
							</FormLabel> 
							<Input 
								type="password"
								onChange={(e) => { 
									setPassword(e.target.value); 
								}} 
							/> 
						</FormControl> 
					</Flex> 
				</Box> 
				
				<Button 
					loadingText="Submitting"
					color="teal"
					bg="darkred"
					variant="solid"
					className="p-2 w-full"
					onClick={() => 
						toast({ 
							title: "Welcome back", 
							description: `${email}`, 
							status: "success", 
							position: "top", 
							duration: 9000, 
							isClosable: true, 
						}) 
					} 
				> 
					Submit 
				</Button> 
			</Box> 
		</Box> 
	); 
}; 

export default LogInForm;
