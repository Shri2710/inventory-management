import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card.js';
import '../styles/DashBoard.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CategoryIcon from '@mui/icons-material/Category';
const DashBoard = () => {
  const inventory = useSelector(state=>state.inventory);
  const getTotalProduct = ()=>{
    return inventory.data.length;
  }

  const getStoreValue = ()=>{
  return inventory?.data.reduce((acc,inv)=>{
        return acc + (inv.quantity * Number(inv.price?.split('$')[1]))
    },0)
  }

  const getOutOfStock = ()=>{
     return inventory.data.filter((inv)=> inv.quantity === 0)?.length;
  }

  const getNoOfCategory = ()=>{
    let cat = new Set();
    inventory.data.map((inv)=> cat.add(inv.category));

    return cat.size;
  }

  const inventoryStats = [
    {
      title:"Total Product",
      value:getTotalProduct
    },
    {
      title:"Total store value",
      value:getStoreValue
    },
    {
      title:"Out of stocks",
      value:getOutOfStock
    },
    {
      title:"No of Category",
      value:getNoOfCategory
    },
  ]

  const icons = [
    <ShoppingCartIcon fontSize='large' />,
    <CurrencyExchangeIcon fontSize='large' />,
    <RemoveShoppingCartIcon fontSize='large' />,
    <CategoryIcon fontSize='large' />
  ]
  return (
    <div className='dashboard-container mt-20'>
      <header>Inventory Stats</header>
      <div className='dashboard'>
      {inventoryStats.map((inv,index)=> <Card dashBoardData={inv} key={index}>
        {icons[index]}
      </Card>)}
      </div>
    </div>
  )
}

export default DashBoard