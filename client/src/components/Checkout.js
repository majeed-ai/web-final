import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useMemo, useState } from 'react';
import { UserContext } from '../App';
import { axiosApi } from '../utils/axiosApi';

export default function Checkout({ isOpen, onClose }) {
  const { cart, showCart, setShowCart, setCart, user } =
    useContext(UserContext);
  const [state, setState] = useState({
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCvv: '',
    address: '',
    city: '',
    country: '',
  });

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const payload = { ...state, user: user?._id, total, items: cart };
      const { data } = await axiosApi.post('/api/v1/orders', payload);
      alert('Order Placed Successfully');
      setCart([]);
      onClose();
      debugger;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const total = useMemo(() => {
    let cartTotal = 0;

    if (cart) {
      cart.forEach((cartItem) => {
        cartTotal += cartItem?.product?.pricing * cartItem?.quantity;
      });
    }

    return cartTotal.toFixed(2);
  }, [cart]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement="right" size={'full'}>
      <DrawerOverlay />
      <DrawerContent scrollBehavior={'inside'}>
        <DrawerCloseButton />
        <DrawerHeader>Checkout</DrawerHeader>
        <DrawerBody scrollBehavior={'inside'}>
          <Container>
            <Card mb={5}>
              <CardHeader>
                <Heading size="md">Order Summary</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {cart?.map((cartItem, i) => (
                    <Box key={i}>
                      <Heading size="xs" textTransform="uppercase">
                        {cartItem?.product?.name}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        ${cartItem?.product?.pricing} x {cartItem?.quantity} = $
                        {cartItem?.product?.pricing * cartItem?.quantity}
                      </Text>
                    </Box>
                  ))}
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Total
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      ${total}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  size={'sm'}
                  placeholder="Address"
                  type="text"
                  required
                  name="address"
                  value={state.address}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>City</FormLabel>
                <Input
                  size={'sm'}
                  placeholder="City"
                  type="text"
                  required
                  name="city"
                  value={state.city}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Country</FormLabel>
                <Input
                  size={'sm'}
                  placeholder="Country"
                  type="text"
                  required
                  name="country"
                  value={state.country}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Credit Card Number</FormLabel>
                <Input
                  size={'sm'}
                  placeholder="Credit Card Number"
                  required
                  type="number"
                  name="creditCardNumber"
                  value={state.creditCardNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Credit Card Expiry</FormLabel>
                <Input
                  size={'sm'}
                  placeholder="Credit Card Expiry"
                  required
                  type="number"
                  name="creditCardExpiry"
                  value={state.creditCardExpiry}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Credit Card CVV</FormLabel>
                <Input
                  size={'sm'}
                  placeholder="Credit Card CVV"
                  required
                  type="number"
                  name="creditCardCvv"
                  value={state.creditCardCvv}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl my={4}>
                <Flex align={'center'} justifyContent={'space-between'}>
                  <Text>Total: ${total}</Text>
                  <Box>
                    <Button size={'sm'} type="submit" colorScheme="blue" mr={3}>
                      Place Order
                    </Button>
                    <Button size={'sm'} onClick={onClose}>
                      Close
                    </Button>
                  </Box>
                </Flex>
              </FormControl>
            </form>
          </Container>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
