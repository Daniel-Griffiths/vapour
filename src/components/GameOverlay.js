import styled from 'styled-components'

export default styled.div`
top: 0;
left: 0;
opacity: 0;
z-index: 5;
width: 100%;
height: 100%;
display: flex;
position: absolute;
align-items: center;
transition: .3s ease;
justify-content: center;
background: rgba(0,0,0,0.7);

:hover{
    opacity: 1;
	cursor: pointer;
    filter: brightness(1.1);
}
`