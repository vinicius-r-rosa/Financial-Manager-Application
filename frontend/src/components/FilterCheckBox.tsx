import styled from 'styled-components'

const CheckBox = styled.input`
    margin-right: 5px;
    accent-color: ${({ theme }) => theme.colors.primary};
`

const FilterCheckbox = ({
    id,
    checked,
    onChange,
    title,
}: {
    id: string
    checked: boolean
    onChange: () => void
    title: string
}) => (
    <label>
        <CheckBox type="checkbox" id={id} checked={checked} onChange={onChange} title={title} />
        {title}
    </label>
)

export default FilterCheckbox
