import { useEffect, useState } from "react";
import Footer from "../Footer";
import Menu from "../Menu";
import axios from "axios";

const Income_expense_report = () => {

    const [msg, setmsg] = useState('');
    const [VehicleName, setVehicleName] = useState(['']);
    const [VehicleId, setVehicleId] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [Reports, setReports] = useState({});
    const [Details, setDetails] = useState(['']);
    const [INcome, setINcome] = useState('');
    const [ExpenSE, setExpenSE] = useState('');
    const [ProFitS, setProFitS] = useState('');

    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Payment_c/VehicleName',
            responseType: 'json'
        }).then(function (response) {
            let Vnm = response.data.vehicl;
            setVehicleName(Vnm);
        });
    }

    const SearchReport = () => {
        axios.post('http://fleet.prantiksoft.com/backend/IncomeExpenseController/getReport', {
            id: VehicleId,
            startDate: startDate,
            endDate: endDate,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let incoMe = response.data.report[0];
            setINcome(incoMe);
            let exPense = response.data.report[1];
            setExpenSE(exPense);
            let finalProfit = response.data.report[2];
            setProFitS(finalProfit);
            let finalDetails = response.data.report[3];
            setDetails(finalDetails);

        })
    }

    useEffect(() => {
        getdata();
        SearchReport();
    }, []);

    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Menu />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Starter Page</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Starter Page</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Add New</h5>
                                        </div>

                                        <div className="card-body row">
                                            <h4>{msg}</h4>
                                            <div className='col-3'>
                                                <div className="form-group row">
                                                    <label className='col-4'>Vehicle Name</label>
                                                    <div className='col-8'>
                                                        <select className='form-control' onChange={(e) => setVehicleId(e.target.value)} value={VehicleId} >
                                                            {VehicleName.map((d, i) =>
                                                                <option value={`${d.id}`} key={i} >{d.name} </option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='col-4'>
                                                <div className="form-group row">
                                                    <label className='col-4'>From Date</label>
                                                    <div className="col-8">
                                                        <input type='date' className='form-control' onChange={(e) => setstartDate(e.target.value)} value={startDate} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-3'>
                                                <div className="form-group row">
                                                    <label className='col-4'>To Date</label>
                                                    <div className="col-8">
                                                        <input type='date' className='form-control' onChange={(e) => setendDate(e.target.value)} value={endDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-2'>
                                                <div className="form-group row">
                                                    <input type='button' className='btn btn-outline-primary btn-block' onClick={SearchReport} value={'Generate'} />

                                                </div>
                                            </div>

                                        </div>

                                        <div className=" container ">
                                            <div className=" row">
                                                <div className="col-4">
                                                    <div className="small-box bg-success">
                                                        <div className="inner">
                                                            <p>Total Income</p>
                                                            <h3>{INcome}</h3>
                                                        </div>
                                                        <div className="icon">
                                                            <i className="ion ion-bag"></i>
                                                        </div>
                                                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                                                    </div>
                                                </div>

                                                <div className="col-4">
                                                    <div className="small-box bg-info">
                                                        <div className="inner">
                                                            <p>Total Expense</p>
                                                            <h3>{ExpenSE}<sup style={{ fontsize: "20px" }}></sup></h3>
                                                        </div>
                                                        <div className="icon">
                                                            <i className="ion ion-stats-bars"></i>
                                                        </div>
                                                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                                                    </div>
                                                </div>


                                                {(ProFitS) <= 0 && (

                                                    <div className="col-4">
                                                        <div className="small-box bg-danger">
                                                            <div className="inner">
                                                                <p>Loss</p>
                                                                <h3>{ProFitS}</h3>
                                                            </div>
                                                            <div className="icon">
                                                                <i className="ion ion-person-add"></i>
                                                            </div>
                                                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                                                        </div>
                                                    </div>
                                                )}

                                                {(ProFitS) > 0 && (
                                                    <div className="col-4">

                                                        <div className="small-box bg-success">
                                                            <div className="inner">
                                                                <p>Profit</p>
                                                                <h3>{ProFitS}</h3>
                                                            </div>
                                                            <div className="icon">
                                                                <i className="ion ion-person-add"></i>
                                                            </div>
                                                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        </div>



                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Payment Expense List</h5>
                                        </div>
                                        {(Details != '') ? <>
                                            <div className="card-body">
                                                <table className='table table-bordered table-stript'>
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Transection Date</th>
                                                            <th>Transection Amount </th>
                                                            <th>Remarks</th>
                                                            <th>Type</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {Details.map((d, i) =>

                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{d.date}</td>
                                                                <td>{d.amount}</td>
                                                                <td>{d.description}</td>
                                                                <td>{d.type}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>

                                            </div>
                                        </> : ''}

                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </div>

    );
}
export default Income_expense_report;
