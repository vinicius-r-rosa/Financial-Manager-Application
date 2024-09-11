import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import apiService from '../services/api'
import { TOAST_TYPES, VALIDATION_TYPE } from '../utils/constants'
import { iClient, iFilter } from '../utils/interfaces'
import { tToast } from '../utils/types'
import ElevatedCard from './ElevatedCard'
import FilterCheckbox from './FilterCheckBox'
import FilterSearch from './FilterSearch'
import SaveFilterModal from './SaveFilterModal'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 668px;
`

const FilterWrapper = styled.div`
    margin: 1rem 0;
`

const FilterTitle = styled.h3`
    margin: 0.25rem;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 20px 0;
    gap: 10px;
`

const Button = styled.button<{ disabled?: boolean }>`
    padding: 10px 15px;
    font-size: 1.17em;

    background-color: ${(props) =>
        props.disabled ? props.theme.colors.neutralMediumGrey : props.theme.colors.primary};

    &:hover {
        background-color: ${(props) =>
            props.disabled ? props.theme.colors.neutralMediumGrey : props.theme.colors.primaryDark};
        cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    }
`

const ButtonSave = styled(Button)`
    color: ${(props) => (props.disabled ? props.theme.colors.neutralWhite : 'inherit')};

    background-color: ${(props) =>
        props.disabled ? props.theme.colors.neutralMediumGrey : props.theme.colors.secondary};

    &:hover {
        background-color: ${(props) =>
            props.disabled ? props.theme.colors.neutralMediumGrey : props.theme.colors.secondaryDark};
    }
`

const StyledDateInput = styled.input.attrs({ type: 'date' })`
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primaryDark};
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.fadedPrimary};
    }
`

const ClientFilterWrapper = styled.div`
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;

    label {
        display: flex;
        align-items: center;
        margin: 0.25rem 0;
    }
`

const ValidationText = styled.span<{ type: string }>`
    font-size: 0.7rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors[props.type]};
`

interface FilterFormProps {
    onFilterChange: ({ clientsList, startDate, endDate, enableComparison, clientsComparisonList }: iFilter) => void
    toast: ({ message, type }: tToast) => void
    saveFilter: (filtersSelected: iFilter) => void
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange, toast, saveFilter }) => {
    const [clients, setClients] = useState<iClient[]>([])
    const [filteredClients, setFilteredClients] = useState<iClient[]>([])
    const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set())
    const [filteredComparisonClients, setFilteredComparisonClients] = useState<iClient[]>([])
    const [selectedComparisonClients, setSelectedComparisonClients] = useState<Set<string>>(new Set())
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [comparisonSearchTerm, setComparisonSearchTerm] = useState<string>('')
    const [enableComparison, setEnableComparison] = useState<boolean>(false)
    const [isSavingFilter, setIsSavingFilter] = useState<boolean>(false)

    const handleOnSaveFilter = (props: iFilter) => {
        saveFilter(props)
        setIsSavingFilter(false)
    }

    useEffect(() => {
        apiService
            .getClients()
            .then((response) => {
                setClients(response.data)
                setFilteredClients(response.data)
            })
            .catch((error) => {
                console.error('Error fetching clients:', error)
                toast({ message: 'Erro ao buscar clientes', type: TOAST_TYPES.ERROR })
            })
    }, [])

    const updateFilteredClients = useCallback(() => {
        const searchLower = searchTerm.toLowerCase()
        setFilteredClients(clients.filter((client) => client.name.toLowerCase().includes(searchLower)))
    }, [searchTerm, clients])

    const updateFilteredComparisonClients = useCallback(() => {
        const searchLower = comparisonSearchTerm.toLowerCase()
        setFilteredComparisonClients(clients.filter((client) => client.name.toLowerCase().includes(searchLower)))
    }, [comparisonSearchTerm, clients])

    useEffect(() => {
        updateFilteredClients()
    }, [searchTerm, clients, updateFilteredClients])

    useEffect(() => {
        updateFilteredComparisonClients()
    }, [comparisonSearchTerm, clients, updateFilteredComparisonClients])

    const handleCheckboxChange = useCallback(
        (clientId: string, setSelected: React.Dispatch<React.SetStateAction<Set<string>>>) => {
            setSelected((prev) => {
                const updatedSelection = new Set(prev)
                updatedSelection.has(clientId) ? updatedSelection.delete(clientId) : updatedSelection.add(clientId)
                return updatedSelection
            })
        },
        []
    )

    const handleSelectAllChange = useCallback(
        (
            checked: boolean,
            filteredClients: iClient[],
            setSelected: React.Dispatch<React.SetStateAction<Set<string>>>
        ) => {
            setSelected(checked ? new Set(filteredClients.map((client) => client.id)) : new Set())
        },
        []
    )

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onFilterChange({
            clientsList: Array.from(selectedClients),
            startDate: startDate || '',
            endDate: endDate || '',
            enableComparison: enableComparison ?? false,
            clientsComparisonList: enableComparison ? Array.from(selectedComparisonClients) : [],
        })

        toast({ message: 'Filtro aplicado!', type: TOAST_TYPES.SUCCESS })
    }

    const validateFilters = () => {
        const isOnlyOneDateFilled = (startDate && !endDate) || (!startDate && endDate)
        const isStartDateBigger = startDate > endDate
        const isEnableComparison = enableComparison
        const isClientFilled = selectedClients.size > 0
        const isClientComparisonFilled = selectedComparisonClients.size > 0

        if (!isClientFilled) {
            return true
        }
        if (isOnlyOneDateFilled) {
            return true
        }
        if (isStartDateBigger) {
            return true
        }
        if (isClientFilled && isEnableComparison && !isClientComparisonFilled) {
            return true
        }
        return false
    }

    return (
        <ElevatedCard>
            <Form onSubmit={handleSubmit}>
                <h2>Buscar transações</h2>
                <FilterWrapper>
                    <FilterTitle>
                        Cliente(s)
                        {!selectedClients.size ? (
                            <ValidationText type={VALIDATION_TYPE.ERROR}> (Campo obrigatório)</ValidationText>
                        ) : (
                            <ValidationText type={VALIDATION_TYPE.SUCCESS}> (Campo obrigatório)</ValidationText>
                        )}
                    </FilterTitle>
                    <FilterSearch
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar cliente"
                    />
                    <ClientFilterWrapper>
                        <FilterCheckbox
                            id="select-all"
                            checked={filteredClients.length > 0 && selectedClients.size === filteredClients.length}
                            onChange={() =>
                                handleSelectAllChange(
                                    !selectedClients.has(filteredClients[0]?.id),
                                    filteredClients,
                                    setSelectedClients
                                )
                            }
                            title="Selecionar tudo"
                        />
                        {filteredClients.map((client) => (
                            <FilterCheckbox
                                key={client.id}
                                id={`client-${client.id}`}
                                checked={selectedClients.has(client.id)}
                                onChange={() => handleCheckboxChange(client.id, setSelectedClients)}
                                title={client.name}
                            />
                        ))}
                    </ClientFilterWrapper>
                </FilterWrapper>
                <FilterWrapper>
                    <FilterTitle>
                        Data Inicial
                        {!endDate ? (
                            <ValidationText type={VALIDATION_TYPE.INFO}> (Campo opcional)</ValidationText>
                        ) : startDate > endDate ? (
                            <ValidationText type="error"> - Data inicial não pode ser maior que a final</ValidationText>
                        ) : !startDate ? (
                            <ValidationText type={VALIDATION_TYPE.ERROR}>
                                {' '}
                                (Campo obrigatório quando o campo 'Data Final' está preenchido)
                            </ValidationText>
                        ) : (
                            <ValidationText type={VALIDATION_TYPE.SUCCESS}>
                                {' '}
                                (Campo obrigatório quando o campo 'Data Final' está preenchido)
                            </ValidationText>
                        )}
                    </FilterTitle>
                    <StyledDateInput
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min="1900-01-01"
                        max="2100-12-31"
                    />
                </FilterWrapper>
                <FilterWrapper>
                    <FilterTitle>
                        Data Final
                        {!startDate ? (
                            <ValidationText type={VALIDATION_TYPE.INFO}> (Campo opcional)</ValidationText>
                        ) : !endDate ? (
                            <ValidationText type={VALIDATION_TYPE.ERROR}>
                                {' '}
                                (Campo obrigatório quando o campo 'Data Inicial' está preenchido)
                            </ValidationText>
                        ) : (
                            <ValidationText type={VALIDATION_TYPE.SUCCESS}>
                                {' '}
                                (Campo obrigatório quando o campo 'Data Inicial' está preenchido)
                            </ValidationText>
                        )}
                    </FilterTitle>
                    <StyledDateInput
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min="1900-01-01"
                        max="2100-12-31"
                    />
                </FilterWrapper>
                <FilterWrapper>
                    <FilterCheckbox
                        id="enable-comparison"
                        checked={enableComparison}
                        onChange={() => setEnableComparison((prev) => !prev)}
                        title="Habilitar Comparação"
                    />
                    <ValidationText type={VALIDATION_TYPE.INFO}> (Campo opcional)</ValidationText>
                </FilterWrapper>
                {enableComparison && (
                    <FilterWrapper>
                        <FilterTitle>
                            Cliente(s) para Comparação
                            {!selectedComparisonClients.size ? (
                                <ValidationText type={VALIDATION_TYPE.ERROR}>
                                    {' '}
                                    (Campo obrigatório quando o campo 'Habilitar Comparação' está preenchido)
                                </ValidationText>
                            ) : (
                                <ValidationText type={VALIDATION_TYPE.SUCCESS}>
                                    {' '}
                                    (Campo obrigatório quando o campo 'Habilitar Comparação' está preenchido)
                                </ValidationText>
                            )}
                        </FilterTitle>
                        <FilterSearch
                            value={comparisonSearchTerm}
                            onChange={(e) => setComparisonSearchTerm(e.target.value)}
                            placeholder="Buscar cliente para comparação"
                        />
                        <ClientFilterWrapper>
                            <FilterCheckbox
                                id="select-comparison-all"
                                checked={
                                    filteredComparisonClients.length > 0 &&
                                    selectedComparisonClients.size === filteredComparisonClients.length
                                }
                                onChange={() =>
                                    handleSelectAllChange(
                                        !selectedComparisonClients.has(filteredComparisonClients[0]?.id),
                                        filteredComparisonClients,
                                        setSelectedComparisonClients
                                    )
                                }
                                title="Selecionar tudo"
                            />
                            {filteredComparisonClients.map((client) => (
                                <FilterCheckbox
                                    key={client.id}
                                    id={`comparison-client-${client.id}`}
                                    checked={selectedComparisonClients.has(client.id)}
                                    onChange={() => handleCheckboxChange(client.id, setSelectedComparisonClients)}
                                    title={client.name}
                                />
                            ))}
                        </ClientFilterWrapper>
                    </FilterWrapper>
                )}
                <ButtonWrapper>
                    <Button disabled={validateFilters()} type="submit">
                        Aplicar Filtros
                    </Button>
                    <ButtonSave disabled={validateFilters()} type="button" onClick={() => setIsSavingFilter(true)}>
                        Salvar Filtro
                    </ButtonSave>
                </ButtonWrapper>
            </Form>
            {isSavingFilter && (
                <SaveFilterModal
                    toast={toast}
                    filtersSelected={{
                        name: '',
                        clientsList: Array.from(selectedClients),
                        startDate: startDate || '',
                        endDate: endDate || '',
                        enableComparison: enableComparison || false,
                        clientsComparisonList: enableComparison ? Array.from(selectedComparisonClients) : [],
                    }}
                    saveFilter={handleOnSaveFilter}
                    onClose={() => setIsSavingFilter(false)}
                />
            )}
        </ElevatedCard>
    )
}

export default FilterForm
