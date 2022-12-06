//mui
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}`]: {
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-columnHeaders, .MuiDataGrid-cell, .MuiDataGrid-cell:focus-within': {
    outline: 'none',
    //border: 'none',
    borderTop: `0px solid ${theme.palette.background.border}`,
    borderBottom: `0px solid ${theme.palette.background.border}`,
    },
    borderRadius: '6px',
    marginBottom: 8,
    color: theme.palette.typography.white,
    '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.background.border, ODD_OPACITY),
        '@media (hover: none)': {
        backgroundColor: 'transparent'
        },
    },
    '&.Mui-selected': {
        backgroundColor: alpha(
            theme.palette.background.border, ODD_OPACITY
        ),
        '&:hover, &.Mui-hovered': {
            
        backgroundColor: alpha(
            theme.palette.background.border,
            ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
            
        ),
        
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
            backgroundColor: alpha(
            theme.palette.background.secondary,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
        },
        },
    },
    },
}));

export default StripedDataGrid