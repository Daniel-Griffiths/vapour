import styled from 'styled-components'

export default styled.nav`
	top: 0;
	left:0;
	width: 100%;
	display: grid;
	grid-area: nav;
	grid-gap: 1rem;
	padding: .5rem;
	position: fixed;
	align-items: center;
	box-shadow: var(--box-shadow);
	background: var(--brand-primary);
	grid-template-columns: 1fr auto auto auto;
	border-bottom: 1px solid rgba(255,255,255,0.1);
`