import ListView from "./Pages/listView/listView";
import "./App.scss"
import DetailPage from "./Pages/details/details";
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">

     <Routes>
     <Route path='/' element={<ListView/>} />
     <Route path ='/detail' element={<DetailPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
