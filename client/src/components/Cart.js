import React, { useContext, useMemo } from 'react';
import { UserContext } from '../App';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Cart({ onCheckout }) {
  const { cart, showCart, setShowCart } = useContext(UserContext);

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
    <>
      <Drawer
        size={'sm'}
        isOpen={showCart}
        placement="right"
        onClose={() => setShowCart(false)}
      >
        <DrawerOverlay />
        <DrawerContent scrollBehavior={'inside'}>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            <Stack divider={<StackDivider />} spacing="2">
              {cart?.map((cartItem) => (
                <CartCard key={cartItem?.product?._id} cartItem={cartItem} />
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter display={'flex'}>
            <Text>Total: ${total}</Text>
            <Spacer />
            <Button
              variant="outline"
              size="sm"
              mr={3}
              onClick={() => setShowCart(false)}
            >
              Cancel
            </Button>
            <Button
              isDisabled={cart?.length <= 0}
              onClick={onCheckout}
              size="sm"
              colorScheme="blue"
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function CartCard({ cartItem }) {
  const { cart, setCart } = useContext(UserContext);

  const handleRemoveItem = () => {
    const newCart = cart?.filter(
      (i) => i?.product?._id !== cartItem?.product?._id
    );
    setCart(newCart);
  };

  const quantityUpdate = (newQuantity) => {
    const newCart = cart?.map((i) =>
      i?.product?._id === cartItem?.product?._id
        ? { ...i, quantity: newQuantity }
        : i
    );
    setCart(newCart);
  };

  return (
    <Flex>
      <Image
        borderRadius="full"
        boxSize="50px"
        src={`http://localhost:8080/static/${cartItem?.product?.image}`}
        alt="Dan Abramov"
      />
      <Box width={'100%'}>
        <Flex alignItems={'center'}>
          <Heading width={'100%'} size="xs" textTransform="uppercase">
            {cartItem?.product?.name}
          </Heading>
          <Spacer />
          <IconButton
            onClick={handleRemoveItem}
            size={'sm'}
            icon={<DeleteIcon />}
          />{' '}
        </Flex>
        <Flex alignItems={'center'} mt={2}>
          <Text fontSize="sm" mr={5}>
            ${cartItem?.product?.pricing}
          </Text>
          <HStack maxW="320px">
            <Button
              isDisabled={cartItem?.quantity <= 1}
              size={'sm'}
              onClick={() =>
                cartItem?.quantity > 1 && quantityUpdate(cartItem?.quantity - 1)
              }
            >
              -
            </Button>
            <Button size={'sm'} variant="ghost">
              {cartItem?.quantity}
            </Button>
            <Button
              size={'sm'}
              isDisabled={cartItem?.quantity >= 10}
              onClick={() =>
                cartItem?.quantity < 10 &&
                quantityUpdate(cartItem?.quantity + 1)
              }
            >
              +
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
}
