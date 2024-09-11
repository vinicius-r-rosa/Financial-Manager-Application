import EditIcon from '@mui/icons-material/Edit'
import React from 'react'
import styled from 'styled-components'
import { iFilter } from '../utils/interfaces'
import ElevatedCard from './ElevatedCard'

const ObsTxt = styled.p`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.neutralDarkGrey};
`

const FilterList = styled.ul`
    list-style-type: none;
    padding: 0;
`

const FilterItem = styled.li`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.neutralMediumGrey};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.neutralLightGrey};
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const TitleAndEditWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ApplyButton = styled.button``

const IconWrapper = styled.div`
    background: none;
    border: none;
    padding: 5px;
    margin: 0 5px;

    svg {
        width: 24px;
        height: 24px;
        fill: ${({ theme }) => theme.colors.primaryDark};
        transition: fill 0.1s ease-in-out;

        &:hover {
            cursor: pointer;
            fill: ${({ theme }) => theme.colors.primary};
        }
    }
`

const DeleteButton = styled.button`
    background-color: ${({ theme }) => theme.colors.error};

    &:hover {
        background-color: ${({ theme }) => theme.colors.errorDark};
    }
`

interface SavedFiltersProps {
    onApplyFilter: (filter: any) => void
    savedFiltersList: iFilter[]
    deleteFilter: (filterName: string) => void
    editFilter: (filterName: string) => void
}

const SavedFilters: React.FC<SavedFiltersProps> = ({ onApplyFilter, savedFiltersList, deleteFilter, editFilter }) => {
    return (
        <ElevatedCard>
            <h2>Filtros Salvos</h2>{' '}
            <ObsTxt>
                <b>Observação:</b> A título de demonstração, sempre que todos os filtros forem deletados, serão
                inseridos alguns filtros pré-definidos via código. Basta deletar todos os filtros salvos e recarregar a
                página para ver este comportamento.
            </ObsTxt>
            {savedFiltersList.length === 0 && <p>Nenhum filtro salvo</p>}
            <FilterList>
                {savedFiltersList.map((filter) => (
                    <FilterItem key={filter.name}>
                        <TitleAndEditWrapper>
                            <span>{filter.name}</span>
                            <IconWrapper onClick={() => filter.name && editFilter(filter.name)} title="Editar nome">
                                <EditIcon />
                            </IconWrapper>
                        </TitleAndEditWrapper>
                        <ButtonWrapper>
                            <ApplyButton onClick={() => onApplyFilter(filter)}>Aplicar</ApplyButton>
                            <DeleteButton onClick={() => filter.name && deleteFilter(filter.name)}>
                                Excluir
                            </DeleteButton>
                        </ButtonWrapper>
                    </FilterItem>
                ))}
            </FilterList>
        </ElevatedCard>
    )
}

export default SavedFilters
