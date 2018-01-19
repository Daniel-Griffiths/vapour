import styled from 'styled-components'

export default styled.div`
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-area: main;
  overflow-y: scroll;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
`