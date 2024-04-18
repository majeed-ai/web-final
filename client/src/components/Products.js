import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Grid,
  GridItem,
  SimpleGrid,
  Container,
  Button,
  Icon,
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';

import { axiosApi } from '../utils/axiosApi';
import { UserContext } from '../App';

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axiosApi.get('/api/v1/products');
      setProducts(data);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Container maxW="900px" py={30}>
        <Heading mb={10}>Products</Heading>
        <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={5}>
          {products?.map((product) => (
            <Box key={product?._id} mt={5}>
              <Product product={product} />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}

function Product({ product }) {
  const { user, cart, setCart, setShowLogin, setShowCart } =
    useContext(UserContext);

  const onAddToCart = () => {
    if (!user?._id) {
      setShowLogin(true);
    } else if (!isInCart) {
      setCart([...cart, { product, quantity: 1 }]);
    } else {
      setShowCart(true);
    }
  };

  const isInCart = useMemo(() => {
    const result = cart?.some((i) => i?.product?._id === product?._id);
    return result;
  }, [cart, product]);

  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      height={'100%'}
      zIndex={1}
    >
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(http://localhost:8080/static/${product?.image})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={`http://localhost:8080/static/${product?.image}`}
          alt="#"
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Heading fontSize={'mg'} fontFamily={'body'}>
          {product?.name}
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={800} fontSize={'lg'}>
            ${product?.pricing.toFixed(2)}
          </Text>
          <Text textDecoration={'line-through'} color={'gray.600'}>
            ${(product?.pricing + product?.pricing * 0.2).toFixed(2)}
          </Text>
        </Stack>
        <Button
          size={'sm'}
          leftIcon={<Icon as={MdShoppingCart} />}
          colorScheme="teal"
          variant="solid"
          onClick={onAddToCart}
        >
          {isInCart ? 'Open Cart' : 'Add to Cart'}
        </Button>
      </Stack>
    </Box>
  );
}
