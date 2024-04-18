import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MdShoppingCart } from 'react-icons/md';
import React, { useContext, useState } from 'react';
import Login from './Login';
import { UserContext } from '../App';
import Cart from './Cart';
import Checkout from './Checkout';

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    user,
    cart,
    setUser,
    setCart,
    showLogin,
    setShowLogin,
    showCart,
    setShowCart,
  } = useContext(UserContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')}>
        <Container maxWidth={900}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box>
                <b>StyleHub</b>
              </Box>
            </HStack>
            <Flex alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {user?._id ? (
                  <Button size={'sm'} onClick={handleLogout} variant="ghost">
                    Logout
                  </Button>
                ) : (
                  <Button
                    size={'sm'}
                    onClick={() => setShowLogin(true)}
                    variant="ghost"
                  >
                    Login
                  </Button>
                )}
              </HStack>
              <IconButton
                onClick={() => user?._id && setShowCart(true)}
                size={'md'}
                icon={<Icon as={MdShoppingCart} boxSize={5} />}
              />
              {cart?.length > 0 && cart?.length}
            </Flex>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {user?._id ? (
                  <Button size={'sm'} onClick={handleLogout} variant="ghost">
                    Logout
                  </Button>
                ) : (
                  <Button
                    size={'sm'}
                    onClick={() => setShowLogin(true)}
                    variant="ghost"
                  >
                    Login
                  </Button>
                )}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
      <Cart
        onCheckout={() => {
          setShowCart(false);
          setShowCheckout(true);
        }}
      />
      {showCheckout && (
        <Checkout
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
        />
      )}
      {!user?._id && (
        <>
          <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
      )}
    </>
  );
}
