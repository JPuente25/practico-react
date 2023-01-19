import React from 'react';
import { Container, Nots, CartBox, Email, StyledLink, StyledNavBar, Ul, MenuBox, DivContainer } from './index.styled';
import { SaleIcon } from '../../assets/icons/SaleIcon';
import { MenuIcon } from '../../assets/icons/MenuIcon';
import { CartIcon } from '../../assets/icons/CartIcon';
import { Context } from '../../context/context';
import { Modal } from '../Modal';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
   const navigate = useNavigate();
   const {state, toggleModal, toggleOrders} = React.useContext(Context);
   const cartItems = state.cart.length;

   const openMenu = () => {
      toggleModal(prev => !prev);
   }

   const onMenuAction = () => {
      if(state.userData) {
         if (window.innerWidth > 640) {
            openMenu();
         } else {
            navigate('/');
         }
      } else if (!state.userData || window.innerWidth <= 640) {
         navigate('/login');
      }
   }

   const onOrders = () => {
      (window.innerWidth >= 640)
         ? onToggleOrders()
         : openOrdersPage()
   };

   const openOrdersPage = () => {
      navigate('/orders');
   };

   const onToggleOrders = () => {
      toggleOrders();
   };

   return (
      <DivContainer>
         <StyledNavBar>
            <MenuBox onClick={openMenu}>
               <MenuIcon height='40px' width='40px'/>
            </MenuBox>
                  
            <Container>
               <div onClick={onMenuAction}>
                  <SaleIcon height='40px' width='40px' />
               </div>
               <Ul>
                  {departmentList.map((item) => 
                     <li key={item.id}>
                        <StyledLink to={`${item.path}/${item.id}`}>{item.text}</StyledLink>
                     </li>
                  )}
               </Ul>
            </Container>
   
            <Container>
               <Email>platzi@example.com</Email>
               <CartBox order="false" onClick={onOrders}>
                  <CartIcon height='30px' width='30px'/>
                  <Nots>{cartItems}</Nots>
               </CartBox>
            </Container>
         </StyledNavBar>
         {state.userData && state.modal && <Modal/>}
      </DivContainer>
   );
};

export const departmentList = [
   {
      text: 'Clothes',
      path: '/category',
      id: 1
   },
   {
      text: 'Electronics',
      path: '/category',
      id: 2
   },
   {
      text: 'Furniture',
      path: '/category',
      id: 3
   },
   {
      text: 'Shoes',
      path: '/category',
      id: 4
   },
   {
      text: 'Others',
      path: '/category',
      id: 5
   },
];
