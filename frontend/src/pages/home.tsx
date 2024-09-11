import React, { useEffect, useState } from 'react'
import FilterForm from '../components/FilterForm'
import SavedFilters from '../components/SavedFilters'
import TransactionTable from '../components/TransactionTable'
import apiService from '../services/api'
import { TOAST_TYPES } from '../utils/constants'
import { iFilter, iTransaction } from '../utils/interfaces'
import { tToast } from '../utils/types'

interface HomePageProps {
    toast: ({ message, type, msDuration }: tToast) => void
}

const filterExample1: iFilter = {
    name: 'Ana Costa: Todas as transações',
    clientsList: ['9f5c7e4b-84d4-49f3-988e-c6c889d5b7c3'],
    startDate: '',
    endDate: '',
    enableComparison: false,
    clientsComparisonList: [],
}

const filterExample2: iFilter = {
    name: 'Ana Costa: Transações 1º Trim/2023',
    clientsList: ['9f5c7e4b-84d4-49f3-988e-c6c889d5b7c3'],
    startDate: '2023-01-01',
    endDate: '2023-03-01',
    enableComparison: false,
    clientsComparisonList: [],
}

const filterExample3: iFilter = {
    name: 'Comparação 1: Ana Costa e Bruno Santos | 2023-2024',
    clientsList: ['9f5c7e4b-84d4-49f3-988e-c6c889d5b7c3'],
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    enableComparison: true,
    clientsComparisonList: ['g24d8b3e-4d8e-4c1a-bc2b-91b22c60f947'],
}

const filterExample4: iFilter = {
    name: 'Comparação 2: Ana Costa e Bruno Santos X Carlos Lima e Fernanda Pereira | Sem Data',
    clientsList: ['9f5c7e4b-84d4-49f3-988e-c6c889d5b7c3', 'g24d8b3e-4d8e-4c1a-bc2b-91b22c60f947'],
    startDate: '',
    endDate: '',
    enableComparison: true,
    clientsComparisonList: ['ce5e3d57-0b58-4c8a-a6d5-78d1cb87d89f', 'f13c0a2e-1e98-438d-b9e5-7d2e6b2b7a9c'],
}

const HomePage: React.FC<HomePageProps> = ({ toast }) => {
    const [dataFetched, setDataFetched] = useState<boolean>(false)
    const [transactions, setTransactions] = useState<iTransaction[]>([])
    const [comparisonTransactions, setComparisonTransactions] = useState<iTransaction[]>([])
    const [filters, setFilters] = useState<iFilter>({
        clientsList: [],
        startDate: '',
        endDate: '',
        enableComparison: false,
        clientsComparisonList: [],
        name: '',
    })
    const savedFiltersList: iFilter[] = JSON.parse(localStorage.getItem('savedFilters') || '[]')

    useEffect(() => {
        if (savedFiltersList.length === 0) {
            localStorage.setItem(
                'savedFilters',
                JSON.stringify([filterExample1, filterExample2, filterExample3, filterExample4])
            )
        }
    }, [])

    const fetchTransactions = ({
        clientsList,
        startDate,
        endDate,
        enableComparison,
        clientsComparisonList,
    }: iFilter) => {
        apiService
            .getTransactions(clientsList, startDate, endDate)
            .then((response) => {
                setTransactions(response.data)
                setFilters({ clientsList, startDate, endDate, enableComparison: enableComparison })
                if (clientsComparisonList && clientsComparisonList.length > 0) {
                    apiService
                        .getTransactions(clientsComparisonList, startDate, endDate)
                        .then((response) => {
                            setComparisonTransactions(response.data)
                        })
                        .catch((error) => {
                            console.error('Error fetching comparison transactions:', error)
                            toast({ message: 'Erro ao buscar transações de comparação', type: TOAST_TYPES.ERROR })
                        })
                }
                setDataFetched(true)
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error)
                toast({ message: 'Erro ao buscar transações', type: TOAST_TYPES.ERROR })
            })
    }

    const handleClear = () => {
        setTransactions([])
        setComparisonTransactions([])
        setFilters({ clientsList: [], startDate: '', endDate: '', enableComparison: false })
    }

    const handleRefresh = () => {
        fetchTransactions({
            clientsList: filters.clientsList,
            startDate: filters.startDate || '',
            endDate: filters.endDate || '',
            enableComparison: filters.enableComparison ?? false,
            clientsComparisonList: filters.clientsComparisonList ?? [],
        })
    }

    const applySavedFilter = (filter: iFilter) => {
        fetchTransactions({
            clientsList: filter.clientsList,
            startDate: filter.startDate || '',
            endDate: filter.endDate || '',
            enableComparison: filter.enableComparison ?? false,
            clientsComparisonList: filter.clientsComparisonList ?? [],
        })

        toast({ message: `Filtro "${filter.name}" aplicado`, type: TOAST_TYPES.SUCCESS })
    }

    const saveFilter = (filtersSelected: iFilter) => {
        const { name, clientsList, startDate, endDate, enableComparison, clientsComparisonList } = filtersSelected
        const newFilter: iFilter = {
            name,
            clientsList: clientsList || [],
            startDate: startDate || '',
            endDate: endDate || '',
            enableComparison: enableComparison || false,
            clientsComparisonList: enableComparison && clientsComparisonList ? clientsComparisonList : [],
        }
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]')
        savedFilters.push(newFilter)
        localStorage.setItem('savedFilters', JSON.stringify(savedFilters))
        toast({ message: 'Filtro salvo', type: TOAST_TYPES.SUCCESS })
    }

    const editFilter = (filterName: string) => {
        const newFilterName = prompt('Digite o novo nome do filtro', filterName)

        if (newFilterName) {
            const updatedFilters = savedFiltersList.map((filter: iFilter) => {
                if (filter.name === filterName) {
                    return { ...filter, name: newFilterName }
                }
                return filter
            })
            localStorage.setItem('savedFilters', JSON.stringify(updatedFilters))
            toast({ message: 'Filtro renomeado', type: TOAST_TYPES.SUCCESS })
        }
    }

    const deleteFilter = (filterName: string) => {
        const updatedFilters = savedFiltersList.filter((filter: iFilter) => filter.name !== filterName)
        localStorage.setItem('savedFilters', JSON.stringify(updatedFilters))
        toast({ message: 'Filtro deletado', type: TOAST_TYPES.SUCCESS })
    }

    return (
        <>
            <FilterForm onFilterChange={fetchTransactions} toast={toast} saveFilter={saveFilter} />
            <SavedFilters
                onApplyFilter={applySavedFilter}
                savedFiltersList={savedFiltersList}
                deleteFilter={deleteFilter}
                editFilter={editFilter}
            />
            <TransactionTable
                transactions={transactions}
                comparisonTransactions={comparisonTransactions}
                enableComparison={filters.enableComparison ?? false}
                onClear={handleClear}
                onRefresh={handleRefresh}
                dataFetched={dataFetched}
            />
        </>
    )
}

export default HomePage
