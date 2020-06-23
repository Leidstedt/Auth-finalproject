import styled from 'styled-components/macro'
import image from '../assets/IMG_4528.JPG'



export const SecretMessageContainer = styled.div`
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    justify-content: center;

   
  }
`

export const Image = styled.div`
    width: 300px;
    height: 375px;
    background-image: url(${image});
    background-size: cover; 
    background-position: center center; 
    margin: 10px;
    @media (min-width: 768px) {
        width: 300px;
        height: 375px;
  }
`