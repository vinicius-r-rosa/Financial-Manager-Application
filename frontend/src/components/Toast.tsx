import React from 'react'
import styled from 'styled-components'

interface ToastProps {
    message: string
    show: boolean
    onClose: () => void
    type: string
    timeInMS?: number
}

const ToastContainer = styled.div<{ show: boolean; type: string }>`
    z-index: 3;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme, type }) => theme.colors[type]};
    color: ${({ theme }) => theme.colors.neutralWhite};
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px ${({ theme }) => theme.colors.fadedBlack};
    display: ${({ show }) => (show ? 'block' : 'none')};
    opacity: ${({ show }) => (show ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
`

const Toast: React.FC<ToastProps> = ({ message, show, onClose, type, timeInMS = 5000 }) => {
    React.useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, timeInMS)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    return (
        <ToastContainer show={show} type={type}>
            {message}
        </ToastContainer>
    )
}

export default Toast
