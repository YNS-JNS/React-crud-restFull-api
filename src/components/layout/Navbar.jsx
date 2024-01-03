// Importing Link from React router dom library:
import { Link } from 'react-router-dom';
// _____________________________________________________

// Importing styled-components library:
import styled from 'styled-components';
// _____________________________________________________

// NavContainer nav:
const NavContainer = styled.nav`
   padding: 20px 15px;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   background-color: #191919;
`;


// Link:
const StyledLink = styled(Link)`
   padding: 10px 15px;
   margin-right: 8px;
   color: #fff;
   text-decoration: none;
   font-size: 18px;
   text-align: center;
   &:hover {
      text-decoration: underline;
      text-decoration-thickness: 5px;
 }
`;

// _____________________________________________________

const Navbar = () => {
   return (
      <NavContainer>
         <div>
            <StyledLink to="/">
               Home
            </StyledLink>
            <StyledLink to="/add-product">
               Add Product
            </StyledLink>

            <StyledLink to="/upload-image">
               Upload
            </StyledLink>
         </div>
      </NavContainer>
   );
};

export default Navbar;
