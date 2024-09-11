import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ClearIcon from '@mui/icons-material/Clear'
import RefreshIcon from '@mui/icons-material/Refresh'
import React, { useState } from 'react'
import styled from 'styled-components'
import { iTransaction } from '../utils/interfaces'
import ElevatedCard from './ElevatedCard'

const TableTitle = styled.h2``

const TableSubtitle = styled.h3`
    margin: 1rem 0;
`

const TableDescription = styled.span`
    font-weight: bold;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.neutralDarkGrey};
    font-style: italic;
    margin-left: 10px;
`

const Table = styled.table`
    // width: 100%;
    // border-collapse: collapse;
    // margin: 20px 0;

    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    position: relative;
`

const Tr = styled.tr``

const Th = styled.th<{ sortable?: boolean; sorted?: boolean; direction?: 'asc' | 'desc' }>`
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.neutralWhite};
    cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};
    text-align: center;
    position: relative; /* To ensure that the sorting indicator is positioned correctly */

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &::after {
        content: '';
        position: absolute;
        right: 10px;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.neutralWhite};
        display: ${(props) => (props.sorted ? 'inline' : 'none')};
        transition: transform 0.3s ease;
        transform: ${(props) => (props.direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
`

const ThItemWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Td = styled.td`
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.neutralMediumGrey};
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
`

const IconWrapper = styled.div<{ disabled?: boolean }>`
    background: none;
    border: none;
    padding: 5px;
    margin: 0 5px;

    svg {
        width: 24px;
        height: 24px;
        fill: ${(props) => (props.disabled ? props.theme.colors.neutralMediumGrey : props.theme.colors.primary)};
        transition: fill 0.1s ease-in-out;

        &:hover {
            cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
            fill: ${(props) =>
                props.disabled ? props.theme.colors.neutralMediumGrey : props.theme.colors.primaryDark};
        }
    }
`

interface TransactionTableProps {
    transactions: iTransaction[]
    onClear: () => void // Callback function to handle clear action
    onRefresh: () => void // Callback function to handle refresh action
    comparisonTransactions?: iTransaction[] // Transactions for comparison
    enableComparison: boolean // Comparison filter value
    dataFetched: boolean // Flag to indicate the first render
}

const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions,
    onClear,
    onRefresh,
    comparisonTransactions,
    enableComparison,
    dataFetched,
}) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof iTransaction | null; direction: 'asc' | 'desc' }>({
        key: 'client',
        direction: 'asc',
    })
    const sortTransactions = (transactions: iTransaction[]) => {
        return [...transactions].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof iTransaction]
            const bValue = b[sortConfig.key as keyof iTransaction]

            // Handle case where the key is 'client'
            if (sortConfig.key === 'client') {
                return (
                    (aValue as any).name.localeCompare((bValue as any).name) * (sortConfig.direction === 'asc' ? 1 : -1)
                )
            }

            // Handle case where the key is 'amount'
            if (sortConfig.key === 'amount') {
                return (
                    (parseFloat(aValue as string) - parseFloat(bValue as string)) *
                    (sortConfig.direction === 'asc' ? 1 : -1)
                )
            }

            // For other types (e.g., date)
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }
    const handleSort = (key: keyof iTransaction) => {
        setSortConfig((prevState) => {
            const newDirection = prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc'
            return { key, direction: newDirection }
        })
    }

    const sortedTransactions = sortTransactions(transactions)
    const sortedComparisonTransactions = comparisonTransactions ? sortTransactions(comparisonTransactions) : []
    const hasTransactions = transactions.length > 0

    return (
        <>
            {dataFetched && (
                <ElevatedCard>
                    <TableTitle>Transações</TableTitle>
                    <ButtonContainer>
                        <IconWrapper
                            disabled={!hasTransactions}
                            onClick={!hasTransactions ? () => {} : onClear}
                            title="Limpar tabela"
                        >
                            <ClearIcon />
                        </IconWrapper>
                        <IconWrapper
                            disabled={!hasTransactions}
                            onClick={!hasTransactions ? () => {} : onRefresh}
                            title="Atualizar tabela"
                        >
                            <RefreshIcon />
                        </IconWrapper>
                    </ButtonContainer>
                    <TableSubtitle>
                        Tabela 1 - <TableDescription>Cliente(s) selecionado(s) no primeiro filtro</TableDescription>
                    </TableSubtitle>
                    <Table>
                        <thead>
                            <Tr>
                                <Th
                                    sortable
                                    sorted={sortConfig.key === 'client'}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSort('client')}
                                >
                                    <ThItemWrapper>
                                        Cliente
                                        {sortConfig.key === 'client' &&
                                            (sortConfig.direction === 'asc' ? (
                                                <ArrowUpwardIcon />
                                            ) : (
                                                <ArrowDownwardIcon />
                                            ))}
                                    </ThItemWrapper>
                                </Th>
                                <Th
                                    sortable
                                    sorted={sortConfig.key === 'date'}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSort('date')}
                                >
                                    <ThItemWrapper>
                                        Data
                                        {sortConfig.key === 'date' &&
                                            (sortConfig.direction === 'asc' ? (
                                                <ArrowUpwardIcon />
                                            ) : (
                                                <ArrowDownwardIcon />
                                            ))}
                                    </ThItemWrapper>
                                </Th>
                                <Th
                                    sortable
                                    sorted={sortConfig.key === 'amount'}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSort('amount')}
                                >
                                    <ThItemWrapper>
                                        Valor
                                        {sortConfig.key === 'amount' &&
                                            (sortConfig.direction === 'asc' ? (
                                                <ArrowUpwardIcon />
                                            ) : (
                                                <ArrowDownwardIcon />
                                            ))}
                                    </ThItemWrapper>
                                </Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {sortedTransactions.length > 0 ? (
                                sortedTransactions.map((transaction) => (
                                    <Tr key={transaction.id}>
                                        <Td>{transaction.client.name}</Td>
                                        <Td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</Td>
                                        <Td>
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(parseFloat(transaction.amount.toString()))}
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={3}>Nenhuma transação para exibir</Td>
                                </Tr>
                            )}
                        </tbody>
                    </Table>
                    {enableComparison && (
                        <>
                            <TableSubtitle>
                                Tabela 2 -{' '}
                                <TableDescription>Cliente(s) selecionado(s) no filtro de comparação</TableDescription>
                            </TableSubtitle>
                            <Table>
                                <thead>
                                    <Tr>
                                        <Th
                                            sortable
                                            sorted={sortConfig.key === 'client'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort('client')}
                                        >
                                            <ThItemWrapper>
                                                Cliente
                                                {sortConfig.key === 'client' &&
                                                    (sortConfig.direction === 'asc' ? (
                                                        <ArrowUpwardIcon />
                                                    ) : (
                                                        <ArrowDownwardIcon />
                                                    ))}
                                            </ThItemWrapper>
                                        </Th>
                                        <Th
                                            sortable
                                            sorted={sortConfig.key === 'date'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort('date')}
                                        >
                                            <ThItemWrapper>
                                                Data
                                                {sortConfig.key === 'date' &&
                                                    (sortConfig.direction === 'asc' ? (
                                                        <ArrowUpwardIcon />
                                                    ) : (
                                                        <ArrowDownwardIcon />
                                                    ))}
                                            </ThItemWrapper>
                                        </Th>
                                        <Th
                                            sortable
                                            sorted={sortConfig.key === 'amount'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort('amount')}
                                        >
                                            <ThItemWrapper>
                                                Valor
                                                {sortConfig.key === 'amount' &&
                                                    (sortConfig.direction === 'asc' ? (
                                                        <ArrowUpwardIcon />
                                                    ) : (
                                                        <ArrowDownwardIcon />
                                                    ))}
                                            </ThItemWrapper>
                                        </Th>
                                    </Tr>
                                </thead>
                                <tbody>
                                    {sortedComparisonTransactions.length > 0 ? (
                                        sortedComparisonTransactions.map((transaction) => (
                                            <Tr key={transaction.id}>
                                                <Td>{transaction.client.name}</Td>
                                                <Td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</Td>
                                                <Td>
                                                    {new Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(parseFloat(transaction.amount.toString()))}
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={3}>Nenhuma transação para exibir</Td>
                                        </Tr>
                                    )}
                                </tbody>
                            </Table>
                        </>
                    )}
                </ElevatedCard>
            )}
        </>
    )
}

export default TransactionTable
