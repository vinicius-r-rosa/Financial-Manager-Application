import React from 'react'
import styled from 'styled-components'

const ElevatedCardWrapper = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.neutralWhite};
    border-radius: 8px;
    box-shadow: 0 2px 4px ${({ theme }) => theme.colors.fadedBlack};
    z-index: 1;
`

const ElevatedCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ElevatedCardWrapper>{children}</ElevatedCardWrapper>
}

export default ElevatedCard
