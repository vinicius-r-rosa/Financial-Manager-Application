import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Spinner = styled.div`
    border: 16px solid ${({ theme }) => theme.colors.secondaryLight}; /* Usando a cor terciária do tema para o fundo */
    border-top: 16px solid ${({ theme }) => theme.colors.secondary}; /* Usando a cor primária do tema para a borda superior */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${spin} 2s linear infinite;
`

const Loader: React.FC = () => {
    return (
        <LoaderWrapper>
            <Spinner />
        </LoaderWrapper>
    )
}

export default Loader
