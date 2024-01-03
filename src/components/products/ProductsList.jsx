import { useEffect, useState } from 'react';
import Product from './Product'
import styled from 'styled-components'
import axios from 'axios';

const WrapperProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 10px;
`;


const ProductsList = () => {

  const [plats, setPlats] = useState([])

  const fetchAllPlats = () => {
    axios
      .get('http://localhost:5000/plats')
      .then((response) => {
        const plats = response.data;
        console.log('Plats récupérés :', plats);
        setPlats(plats)
        
      })
      .catch((error) => {
        console.error('Erreur :', error);
      });
  }

  useEffect(() => {
    fetchAllPlats();
  }, [])


  return (
    <WrapperProduct>
      {
        plats && plats.map((plat, index)=>(
          <Product key={index} plat={plat} />
        ))
      }
    </WrapperProduct>
  )
}

export default ProductsList