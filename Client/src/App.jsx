import React from 'react'; // Make sure you import React
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Home1 from './Home1';
import Home2 from './Home2';
import First from './First';
import HomeA from './HomeA';
import FormD from './FormD';
import Conformation from './Conformation';
import Conformation1 from './Conformation1';
import Conformation2 from './Conformation2';
import Conformation3 from './Conformation3';
import Cancel from './Cancel';
import Cancel1 from './Cancel1';
import Cancel2 from './Cancel2';
import Cancel3 from './Cancel3';
import Specialrequest from './Specialrequest';
import Map from './Map';
import Vehicledetails from './Vehicledetails';
import Assign from './Assign';
import Driverdetails from './Driverdetails';
import DriverAdd from './DriverAdd';
import DriverEdit from './DriverEdit';
import Vehicleadd from './VehicleAdd';
import Vehicleedit from './VehicleEdit';
import RectorHome from './RectorHome';
import Locatin from './Locatin';
import DriverHome from './DriverHome';
import Map0 from './Map/Map0';
import Map1 from './Map/Map1';
import Map2 from './Map/Map2';
import Map3 from './Map/Map3';
import Map4 from './Map/Map4';
import Map5 from './Map/Map5';
import Mapview0 from './Map/mapview0';
import Mapview1 from './Map/mapview1';
import Mapview2 from './Map/mapview2';
import Mapview3 from './Map/mapview3';
import Mapview4 from './Map/mapview4';
import Mapview5 from './Map/mapview5';
import Maintains from './Maintains';
import MaintainsAdd from './MaintainsAdd';
import MaintainsEdit from './MaintainsEdit';
import Setting from './Setting';


function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<First />} ></Route>
        <Route path="/register" element={<Signup />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/home1" element={<Home1 />} ></Route>
        <Route path="/home2" element={<Home2 />} ></Route>
        <Route path="/Ahome" element={<HomeA />} ></Route>
        <Route path="/FormD" element={<FormD />} ></Route>
        <Route path="/conformation" element={<Conformation />} ></Route>
        <Route path="/conformation1" element={<Conformation1 />} ></Route>
        <Route path="/conformation2" element={<Conformation2 />} ></Route>
        <Route path="/conformation3" element={<Conformation3 />} ></Route>
        <Route path="/cancel" element={<Cancel />} ></Route>
        <Route path="/cancel1" element={<Cancel1 />} ></Route>
        <Route path="/cancel2" element={<Cancel2 />} ></Route>
        <Route path="/cancel3" element={<Cancel3 />} ></Route>
        <Route path="/SpecialRequest" element={<Specialrequest />} ></Route>
        <Route path="/Map" element={<Map />} ></Route>
        <Route path="/Vehicledetails" element={<Vehicledetails />} ></Route>
        <Route path="/Assign" element={<Assign />} ></Route>
        <Route path="/DriversDetails" element={<Driverdetails />} ></Route>
        <Route path='/DriverAdd' element={<DriverAdd />} ></Route>
        <Route path='/DriverEdit' element={<DriverEdit />}></Route>
        <Route path='/vehicleadd' element={<Vehicleadd />} ></Route>
        <Route path='/vehicleedit' element={<Vehicleedit />} ></Route>
        <Route path='/RectorHome' element={<RectorHome />} ></Route>
        <Route path='/Locatin' element={<Locatin />} ></Route>
        <Route path='/DriverHome' element={<DriverHome />} ></Route>
        <Route path='/Map1' element={<Map1 />} ></Route>
        <Route path='/Map2' element={<Map2 />} ></Route>
        <Route path='/Map3' element={<Map3 />} ></Route>
        <Route path='/Map0' element={<Map0 />} ></Route>
        <Route path='/Map4' element={<Map4 />} ></Route>
        <Route path='/Map5' element={<Map5 />} ></Route>
        
        <Route path='/mapview0' element={<Mapview0 />} ></Route>
        <Route path='/mapview1' element={<Mapview1 />} ></Route>
        <Route path='/mapview2' element={<Mapview2 />} ></Route>
        <Route path='/mapview3' element={<Mapview3 />} ></Route>
        <Route path='/mapview4' element={<Mapview4 />} ></Route>
        <Route path='/mapview5' element={<Mapview5 />} ></Route>
        <Route path='/Maintains' element={<Maintains />} ></Route>
        <Route path='/MaintananceAdd' element={<MaintainsAdd />} ></Route>
        <Route path='/Maintananceedit' element={<MaintainsEdit />} ></Route>
        <Route path='/Setting' element={<Setting />} ></Route>
        
      </Routes>
      
    </BrowserRouter>
    
    
  );
}

export default App;
