import { styled } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const CustomMenuItem = styled(Link)({
    textDecoration: 'none',
    color: '#192949',
    fontSize: '12px',
})

export const CustomPlainMenuItem = styled('span')({
    textDecoration: 'none',
    color: '#192949',
    fontSize: '12px',
    cursor: 'pointer',
})
