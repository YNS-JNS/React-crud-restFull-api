
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 500px;
  margin: 0 5px;
`;

const Img = styled.img`
  /* width: 100%;  */
  max-width: 100%;
  height: auto;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #191919;
  color: #fff;
`;

const DivContainer = styled.div`
  display: flex;
  padding: 5px 10px;
`;

const TitleProduct = styled.h4`
  padding: 5px 10px;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Product = ({ plat }) => {

  const { id, nom, ingredients, image } = plat;

  return (
    <WrapperCard>
      <Link to={`/update-product/${id}`} >
        {/* <Img src="https://www.allrecipes.com/thmb/K_5KFejJ3A7Puvb_AswiCMQzsN4=/144x95/filters:no_upscale():max_bytes(150000):strip_icc():focal(915x0:917x2):format(webp)/5867379-361fd5f1eb254d38b7913e0abfaee07a.jpg" alt="Product" /> */}
        <Img src={image} alt="Product" />
        <CardContainer>
          <TitleProduct><b>{nom}</b></TitleProduct>

          <DivContainer>
            <Ul>
              {
                ingredients && ingredients.map((ingredient, index) => (
                  <li key={index} >{ingredient}</li>
                ))
              }
            </Ul>

          </DivContainer>

        </CardContainer>
      </Link>
    </WrapperCard>
  )
}

export default Product