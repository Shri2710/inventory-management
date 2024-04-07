import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch} from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/EditPopUp.css';
import _ from "lodash";
import { editItem } from '../store/slices/inventoryList';

const EditPopUp = ({ open, inventory, onClick }) => {
    
    const [item, setItem] = useState(inventory);
    const [attributeChanged, setAttributeChanged] = useState(false);
    const dispatch  =useDispatch()
    const handleItemAttributeChange = (e, attribute) => {
        setAttributeChanged(true);
        switch (attribute) {
            case 'Category':
                setItem((prev) => {return { ...prev, category: e.target.value }})
                break;
            case 'Price':
                setItem((prev) => {return { ...prev, price: `$${e.target.value}`,value: String("$"+(Number(prev.quantity) * Number(e.target.value)))}})
                break;
            case 'Quantity':
                setItem((prev) => {return { ...prev, quantity:Number(e.target.value),value: String("$"+(Number(e.target.value) * Number(prev.price.split("$")[1]))) }})
                break;
            case 'Value':
                setItem((prev) => {return { ...prev, value:`$${e.target.value}` }})
                break;
        }
    }

    const handleSave = () => {
        if(_.isEqual(inventory,item)){
            this.handleClose();
        }else{
            item.value = String("$"+(item.quantity * Number(item.price.split("$")[1])));
            item.editMode = false;
            dispatch(editItem({name:inventory.name,item:item,type:'save'}));
        }
    }
    const handleClose = () => {
        onClick(inventory);
        setAttributeChanged(false);
        setItem(inventory); 
    }
    return (
        <Dialog open={open}>
            <div className='popup-container'>
                <DialogTitle>
                    <div className='header'>
                        <div>
                            Edit Product
                        </div>
                        <div onClick={handleClose} >
                            <CloseIcon className='close-icon' />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='column'>
                        <div className='name'>
                            {item.name}
                        </div>
                        <div className='column mt-10'>
                            <div className='row'>
                                <div className='column'>
                                    <label for='category'>Category</label>
                                    <input type='text' value={item.category} name='category' id='category' className='mt-10' onChange={(e) => handleItemAttributeChange(e, 'Category')} />
                                </div>
                                <div className='column'>
                                    <label for='price'>price</label>
                                    <input type='text' value={item.price.split("$")[1]} name='price' id='price' className='mt-10' onChange={(e) => handleItemAttributeChange(e, 'Price')} />
                                </div>
                            </div>
                            <div className='row mt-10'>
                                <div className='column'>
                                    <label for='quantity'>quantity</label>
                                    <input type='text' value={item.quantity} name='quantity' id='quantity' className='mt-10' onChange={(e) => handleItemAttributeChange(e, 'Quantity')} />
                                </div>
                                <div className='column'>
                                    <label for='value'>value</label>
                                    <input type='text' value={item.value.startsWith("$") ?  item.value.split("$")[1] : item.value} name='value' id='value' className='mt-10' disabled onChange={(e) => handleItemAttributeChange(e, 'Value')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='row'>
                        <button onClick={handleClose} className='btn cancel-btn'>Cancel</button>
                        <button onClick={handleSave} disabled={!attributeChanged} className='btn save-btn'>Save</button>
                    </div>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default EditPopUp