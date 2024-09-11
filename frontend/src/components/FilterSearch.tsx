import styled from 'styled-components'

const SearchInput = styled.input`
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    margin: 0.5rem 0;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primaryDark};
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.fadedPrimary};
    }
`

const FilterSearch = ({
    value,
    onChange,
    placeholder,
}: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}) => <SearchInput type="text" placeholder={placeholder} value={value} onChange={onChange} />

export default FilterSearch
