import {BrowserRouter} from 'react-router-dom'; 
import AppRoutes from './routes/AppRoutes'; 
import {initStorage} from './utils/localStorage';
 initStorage(); 
 export default function App(){
    return <BrowserRouter><AppRoutes/></BrowserRouter>}
    
