import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { axiosApi } from '../utils/axiosApi';
import { UserContext } from '../App';

export default function Login({ onClose, isOpen }) {
  const { setUser } = useContext(UserContext);
  const [tabIndex, setTabIndex] = useState(1);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [registerState, setRegisterState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginState((oldState) => ({ ...oldState, [name]: value }));
  };
  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterState((oldState) => ({ ...oldState, [name]: value }));
  };

  const onLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axiosApi.post('/api/v1/users/login', loginState);
      setUser(data.user);
    } catch (error) {
      alert(`Error, ${error?.message}`);
    }
  };

  const onRegisterSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axiosApi.post(
        '/api/v1/users/register',
        registerState
      );
      alert('Registration Success');
      setTabIndex(0);
    } catch (error) {
      alert(`Error, ${error?.response?.data?.error || error?.message}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Tabs
          align="center"
          variant="enclosed"
          isFitted
          isLazy
          value={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={onLoginSubmit}>
                <ModalBody>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      type="email"
                      required
                      name="email"
                      value={loginState.email}
                      onChange={handleLoginChange}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Password"
                      required
                      type="password"
                      name="password"
                      value={loginState.password}
                      onChange={handleLoginChange}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <Button type="submit" colorScheme="blue" mr={3}>
                      Submit
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                  </FormControl>
                </ModalBody>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={onRegisterSubmit}>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder="Username"
                      type="text"
                      required
                      name="username"
                      value={registerState.username}
                      onChange={handleRegisterChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      type="email"
                      required
                      name="email"
                      value={registerState.email}
                      onChange={handleRegisterChange}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Password"
                      required
                      type="password"
                      name="password"
                      value={registerState.password}
                      onChange={handleRegisterChange}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <Button type="submit" colorScheme="blue" mr={3}>
                      Submit
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                  </FormControl>
                </ModalBody>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}
