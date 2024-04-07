import { useDispatch, useSelector} from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { fetchInventoryList } from './store/slices/inventoryList';
import Inventory from './pages/Inventory';
import DataFetchProgress from './components/DataFecthProgress';
function App() {
  const dispatch = useDispatch();
  const inventory = useSelector(state=> state.inventory);
  
  
  useEffect(()=>{
     dispatch(fetchInventoryList());
  },[]);

  if(inventory.isLoading){
    return <DataFetchProgress msg={"Loading . . . "} />
  }

  if(inventory.isError){
    return <DataFetchProgress msg={"Something went wrong Please try after some time"} />
  }
  return (
    <>
      <Inventory />
    </>
  );
}

export default App;
