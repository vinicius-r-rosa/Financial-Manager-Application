import React, { useState } from 'react'
import styled from 'styled-components'
import { TOAST_TYPES } from '../utils/constants'
import { iFilter } from '../utils/interfaces'
import { tToast } from '../utils/types'

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.fadedBlack};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.colors.neutralWhite};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px ${({ theme }) => theme.colors.fadedBlack};
    width: 400px;
    text-align: center;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid ${({ theme }) => theme.colors.neutralMediumGrey};
    border-radius: 4px;
    font-size: 16px;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

const Button = styled.button`
    padding: 10px 15px;
    background-color: ${({ theme }) => theme.colors.success};
    margin: 0.5rem 0;

    &:hover {
        background-color: ${({ theme }) => theme.colors.successDark};
    }
`

const CancelButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.error};

    &:hover {
        background-color: ${({ theme }) => theme.colors.errorDark};
    }
`

interface SaveFilterModalProps {
    onClose: () => void
    toast: ({ message, type }: tToast) => void
    saveFilter: (filtersSelected: iFilter) => void
    filtersSelected: iFilter
}

const SaveFilterModal: React.FC<SaveFilterModalProps> = ({ saveFilter, onClose, toast, filtersSelected }) => {
    const [filterName, setFilterName] = useState<string>('')

    const handleSave = () => {
        if (filterName.trim()) {
            saveFilter({ ...filtersSelected, name: filterName })
        } else {
            toast({ message: 'Insira um nome para o filtro', type: TOAST_TYPES.ERROR })
        }
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Salvar Filtro</h2>
                <Input
                    type="text"
                    placeholder="Nome do Filtro"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <ButtonWrapper>
                    <Button onClick={handleSave}>Salvar</Button>
                    <CancelButton onClick={onClose}>Cancelar</CancelButton>
                </ButtonWrapper>
            </ModalContent>
        </ModalOverlay>
    )
}

export default SaveFilterModal
