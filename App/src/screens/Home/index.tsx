import React from 'react';

import { Container, Image } from './styles';


const Home: React.FC = () => {
  return (
    <Container >
      <Image source={require( '../../assets/logo.png')} />
    </Container>
    )
}

export default Home;