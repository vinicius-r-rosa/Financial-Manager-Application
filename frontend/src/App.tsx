import React, { useState } from 'react'
import styled from 'styled-components'
import Toast from './components/Toast'
import HomePage from './pages/home'
import apiService from './services/api'
import { TOAST_TYPES } from './utils/constants'
import { iFilter, iTransaction } from './utils/interfaces'
import { tToast } from './utils/types'

const AppWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
`
const AppNavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.fadedBlack};
    background-color: ${({ theme }) => theme.colors.primary};
`

const AppName = styled.h1`
    margin: 0;
    font-size: 1rem;
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.neutralWhite};
    // font-family: Open Sans
`
const AppFooter = styled.footer`
    padding: 1rem;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.primary};
    border-top: 1px solid ${({ theme }) => theme.colors.neutralMediumGrey};
    color: ${({ theme }) => theme.colors.neutralWhite};

    & p {
        font-size: 1.1rem;
        margin: 0;
        padding: 0;
    }

    & span {
        font-size: 0.8rem;
    }
`

const App: React.FC = () => {
    const [toastMessage, setToastMessage] = useState<string>('')
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastType, setToastType] = useState<string>(TOAST_TYPES.INFO)

    const toast = ({ message, type, msDuration = 3000 }: tToast) => {
        setToastMessage(message)
        setToastType(type)
        setShowToast(true)
        setTimeout(() => setShowToast(false), msDuration)
    }

    return (
        <>
            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} type={toastType} />
            <AppNavBar>
                <AppName>Financial Manager Application</AppName>
            </AppNavBar>
            <AppWrapper>
                <HomePage toast={toast} />
            </AppWrapper>
            <AppFooter>
                <p>&copy; 2024 Financial Manager Application</p>
                <span>
                    Desenvolvido por{' '}
                    <b>
                        <a target="_blank" rel="noreferrer" href="https://linkedin.com/in/viniciusrodriguesrosa">
                            Vinicius Rosa
                        </a>
                    </b>
                </span>
            </AppFooter>
        </>
    )
}

export default App
