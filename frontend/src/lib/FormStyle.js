import styled from 'styled-components/macro'


export const Article = styled.div`

    display: flex;
    width: 400px;
    height: 300px; 
    flexdirection: column;
    flexwrap: wrap;
    border: solid 2px black;
    margin: 10px;

    @media (min-width: 768px) {
        width: 400px;
        height: 300px; 
`

export const From = styled.form`

    margin: 10px;
    width: 200px
 
`


export const Input = styled.input`

   margin: 10px;


`
