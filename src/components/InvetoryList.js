import React from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/InventoryList.css';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { deleteItem, editItem, toggleVisibiltyOfItem } from '../store/slices/inventoryList';
import EditPopUp from './EditPopUp';

const InvetoryList = () => {

  const inventory = useSelector(state=>state.inventory);
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const handleDeleteItem = ({name})=>{
      dispatch(deleteItem(name));
  }

  const handleVisibilityAction = ({name})=>{
    dispatch(toggleVisibiltyOfItem(name));
  }

  const handleEditClick = (inventory)=>{
    dispatch(editItem({name:inventory.name,item:inventory,type:'cancel'}));
  }
  const isActionsDisabled = (item)=>{
    return user === 'user' || item.disabled;
  }

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{maxWidth:"100%"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><span className='custom-header'>Name</span></TableCell>
            <TableCell align="center"><span className='custom-header'>Category</span></TableCell>
            <TableCell align="center"><span className='custom-header'>Price</span></TableCell>
            <TableCell align="center"><span className='custom-header'>Quantity</span></TableCell>
            <TableCell align="center"><span className='custom-header'>Value</span></TableCell>
            <TableCell align="center"><span className='custom-header'>Action</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {inventory.data.map((row) => (
            <>
                <TableRow
              key={row.name}
            >
              <TableCell className={`${row.disabled ? 'c-gr' : 'c-wh'}`}>
                {row.name}
              </TableCell>
              <TableCell align="center" className={`${row.disabled ? 'c-gr' : 'c-wh'}`}>{row.category}</TableCell>
              <TableCell align="center" className={`${row.disabled ? 'c-gr' : 'c-wh'}`}>{row.price}</TableCell>
              <TableCell align="center" className={`${row.disabled ? 'c-gr' : 'c-wh'}`}>{row.quantity}</TableCell>
              <TableCell align="center" className={`${row.disabled ? 'c-gr' : 'c-wh'}`}>{row.value}</TableCell>
              <TableCell align='right' className={`${row.disabled ? 'c-gr' : 'c-wh'}`}>
              <div className='actions'>
                    <div>
                        <button disabled={isActionsDisabled(row)} onClick={()=> handleEditClick(row)}><EditIcon style={{color:`${isActionsDisabled(row) ? 'grey': 'green' }`}} color={isActionsDisabled(row) ? 'disabled' : 'success'} /></button>
                    </div>
                    <div>
                      <button disabled={user === 'user'} onClick={()=> handleVisibilityAction(row)}>
                       { row.disabled ? <VisibilityOffIcon style={{color:`${user === 'user' ? 'grey': '#f37ff5' }`}} />  : <VisibilityIcon style={{color:`${user === 'user' ? 'grey': '#f37ff5' }`}} />}
                      </button>
                    </div>
                    <div>
                       <button disabled={user === 'user'} onClick={()=>handleDeleteItem(row)}><DeleteIcon style={{color:`${user === 'user' ? 'grey': 'red' }`}} /></button>
                    </div>
                </div>
              </TableCell>
            </TableRow>
            { row.editMode &&  <EditPopUp open={row.editMode} inventory={row} onClick={handleEditClick} />}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InvetoryList