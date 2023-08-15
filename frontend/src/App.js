import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import List from './users/List';
import Edit from './Edit';
import Stockout from './bijoy/Stockout';
import Editstock from './bijoy/Editstock';
import Partinventory from './bijoy/Partinventory';
import Stockdetails from './bijoy/Stockdetails';
import Availablecar from './bijoy/Availablecar';


import Payment from './nasim/Payment';
import EditPmnt from './nasim/EditPmnt';
import Income_expense_report from './nasim/Income_expense_report';
import PaymentManage from './nasim/PaymentManage';
import Addinl_cost from './nasim/Addinl_cost';


import Vendorlist from './Vendors/Vendorlist';
import Edit_vandor from './Vendors/Edit_vandor';
import Booking_add from './Tauhid/Booking_add';
import Booking_list from './Tauhid/Booking_list';
import Booking_edit from './Tauhid/Booking_edit';
import Booking_view from './Tauhid/Booking_view';
import Booking_report from './Tauhid/Booking_report';

import Vehicles from './Rubel/Vehicles';
import Vehicle_type from './Rubel/Vehicle_type';
import Vehicles_add from './Rubel/Vehicles_add';
import Vehicleedit from './Rubel/Vehicleedit';
import Type_list from './Rubel/Type_list';
import Edit_type from './Rubel/Edit_type';


import Maintenance from './component/Maintenance';
import Editmaintenance from './component/Editmaintenance';
import Maintenancelist from './component/Maintenancelist';
import Addoil from './component/Addoil';
import Reminder from './component/Reminder';

import Parts from './alamin/Parts';
import Parts_edit from './alamin/Parts_edit';

import Driver from './mahmud/Driver';
import Driveredit from './mahmud/Driveredit';
import Driver_view from './mahmud/Driver_view';
import Driverlist from './mahmud/Driverlist';
import Driver_report from './mahmud/Driver_report';


import Customers from './customers/Customers';
import Customersedit from './customers/Customersedit';
import Customer_list from './customers/Customer_list';
import Reminder_car from './reminder/Reminder_car';
import Reminder_list from './reminder/Reminder_list';


import Driver_payment_add from './Opu/Driver_payment_add';
import Driver_payment_list from './Opu/Driver_payment_list';
import Payment_edit from './Opu/Payment_edit';

import Parts_stock_in from './Ashraf/Parts_stock_in';
import EditParts from './Ashraf/EditParts'
import Vehicletrack from './tracking/Vehicletrack';

import Fuel_Edit from './Fuel/Fuel_Edit';
import Fuel from './Fuel/Fuel';
import Fuel_list from './Fuel/Fuel_list';
import Fuel_report from './Fuel/Fuel_report';
import Fuel_chart from './Fuel/Fuel_chart';
import Tracking from './tracking/Tracking';


import Services_add from './Rubel/Services_add';
import Service_list from './Rubel/Service_list';
import Edit_service from './Rubel/Edit_service';

import Vendor_payments from './Vendorspayment/Vendorspayment';
import Paymentlist from './Vendorspayment/Paymentlist';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/admin' element={<List/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/stock-out' element={<Stockout/>}></Route>
        <Route path='/editparts/:id' element={<Editstock/>}></Route>
        <Route path='/parts-inventory/' element={<Partinventory/>}></Route>
        <Route path='/stock-details/:id' element={<Stockdetails/>}/>
        <Route path='/vehicle-track' element={<Vehicletrack/>}/>
        <Route path='/tracking' element={<Tracking/>}/>
        <Route path='/available-car' element={<Availablecar/>}/>
        

        <Route path='/payment' element={<Payment />} />
        <Route path='/payment_manage' element={<PaymentManage />} />
        <Route path='/edit_payment/:id' element={<EditPmnt />} />
        <Route path='/income_expense_report' element={<Income_expense_report />} />
        <Route path='/additional_cost' element={<Addinl_cost />} />

        <Route path='/vendor' element={<Vendorlist/>}/>
        <Route path='/editvendors/:id' element={<Edit_vandor/>}/>

        <Route path='/bookingadd' element={<Booking_add/>}/>
        <Route path='/bookinglist' element={<Booking_list/>}/>
        <Route path='/bookingedit/:id' element={<Booking_edit/>}/>
        <Route path='/bookingview/:id' element={<Booking_view/>}/>
        <Route path='/bookingreport' element={<Booking_report/>}/>

        <Route path='/vehicle' element={<Vehicles/>}/>
        <Route path='/type' element={<Vehicle_type/>}/>
        <Route path='/typelist' element={<Type_list/>}/>
        <Route path='/add' element={<Vehicles_add/>}/>
        <Route path='/editvehicle/:id' element={<Vehicleedit/>}/>
        <Route path='typeedit/:id' element={<Edit_type/>}/>

        <Route path='/maintenance/' element={<Maintenance/>}/>
        <Route path='/maintanenceedit/:id' element={<Editmaintenance/>}/>
        <Route path='/list' element={<Maintenancelist/>}/>
        <Route path='/addoil' element={<Addoil/>}/>
        <Route path='/engine_oil' element={<Reminder/>}/>

        <Route path='/parts' element={<Parts/>}/>
        <Route path='/parts_edit/:id' element={<Parts_edit/>}/>

        <Route path='/driver' element={<Driver/>}/>
        <Route path='/driverlist' element={<Driverlist/>}/>
        <Route path='/editdriver/:id' element={<Driveredit/>}/>
        <Route path='/viewdriver/:id' element={<Driver_view/>}/>
        <Route path='/driver_report' element={<Driver_report/>}/>

        <Route path='/customer' element={<Customers/>}/>
        <Route path='/customersedit/:id' element={<Customersedit/>}/>
        <Route path='/customers_management' element={<Customer_list/>}/>
        <Route path='/reminder' element={<Reminder_car/>}/>
        <Route path='/reminder_management' element={<Reminder_list/>}/>


        <Route path='/driverpaymentadd' element={<Driver_payment_add/>}/>
        <Route path='/driverpaymentlist' element={<Driver_payment_list/>}/>
        <Route path='/paymentedit/:id' element={<Payment_edit/>}/>

        <Route path='/parts_stock_in' element={<Parts_stock_in/>}/>
        <Route path='/editPartsin/:id' element={<EditParts/>}/>

        <Route path='/fuel_edit/:id' element={<Fuel_Edit/>}/>
        <Route path='/fuel' element={<Fuel/>}/>
        <Route path='/fuel_list' element={<Fuel_list/>}/>
        <Route path='/fuel_rep' element={<Fuel_report/>}/>
        <Route path='/fuel_graph/:id' element={<Fuel_chart/>}/>


        <Route path='/add_service' element={<Services_add/>}/>
        <Route path='/service_list' element={<Service_list/>}/>
        <Route path='/editservice/:id' element={<Edit_service/>}/>

        <Route path='/paymentlist' element={<Paymentlist/>}/>
        <Route path='/vendorspayment' element={<Vendor_payments/>}/>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
