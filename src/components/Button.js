import styled from 'styled-components'

export default styled.button`
    outline: 0;
    color: #fff;
    display: block;
    cursor: pointer;
    border-radius: 3px;
    font-size: inherit;
    padding: .5rem 1rem;
    transition: .1s ease;
    background: transparent;
    border: 1px solid rgba(255,255,255,.1);

    &:hover{
    	background: rgba(255,255,255,0.1);
    }
`