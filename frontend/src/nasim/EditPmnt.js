import Menu from "../Menu";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, redirect, useParams } from "react-router-dom";



export default function EditPmnt() {

    const [Vehicl_name, setVehi] = useState([]);
    const [carID, setcarID] = useState('');
    const [ScarD, setScarID] = useState('');
    const [Vname, setVehiNM] = useState(0);
    const [dates, seteDate] = useState('');
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');
    const [type, setType] = useState('');
    const [msg, setmsg] = useState('');
    const q = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.post('http://fleet.prantiksoft.com/backend/Payment_c/getPerId', {
            id: q.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let vehicleId = response.data.income_expense.vehicle_id;
            setcarID(vehicleId);
            setScarID(response.data.income_expense.id);
            seteDate(response.data.income_expense.trans_date);
            setAmount(response.data.income_expense.amount);
            setRemark(response.data.income_expense.remarks);
            setType(response.data.income_expense.type);


        }
        )
    }, []);


    // -------- Part for Name

    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Payment_c/VehicleName',
            responseType: 'json'
        }).then(function (response) {
            let Vehicle_data = response.data.vehicl;
            setVehi(Vehicle_data);

        });
    }

    useEffect(() => {
        getdata();
    }, []);

    // -------- /Part for Name

    const update = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Payment_c/saveUpdate', {
            id: ScarD,
            vehicle_id: carID,
            trans_date: dates,
            amount: amount,
            remarks: remark,
            type: type
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg);
            navigate("/payment");

        })
    }



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
                                        <div className="card-body">
                                            <h4>{msg}</h4>
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>Vehicle Name</th>
                                                        <td>
                                                            <select className='form-control' onChange={(e) => setcarID(e.target.value)} value={carID} >
                                                                {
                                                                    Vehicl_name.map((d, i) => {
                                                                        return (
                                                                            <option value={d.id} key={i}  > {d.name} </option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Transjection date</th>
                                                        <td>
                                                            <input type="text" className="form-control" value={dates} disabled />
                                                            <input type='date' className='form-control' onChange={(e) => seteDate(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Amount</th>
                                                        <td><input type='number' className='form-control' onChange={(e) => setAmount(e.target.value)} value={amount} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Remarks</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setRemark(e.target.value)} value={remark} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Type</th>
                                                        <td>
                                                            {(type === 'income') ? <>
                                                                <input type="radio" id="html" name="fav_language" value={'income'} onChange={(e) => setType(e.target.value)} checked /><label >Income</label>
                                                            </> : <>
                                                                <input type="radio" id="html" name="fav_language" value={'income'} onChange={(e) => setType(e.target.value)} /><label >Income</label>
                                                            </>}

                                                            {(type === 'expense') ? <>
                                                                <input type="radio" id="html" name="fav_language" value={'expense'} onChange={(e) => setType(e.target.value)} checked />
                                                                <label >Expense</label><br />
                                                            </> : <>
                                                                <input type="radio" id="html" name="fav_language" value={'expense'} onChange={(e) => setType(e.target.value)} /><label >Expense</label><br />
                                                            </>}

                                                            {(type === 'expense') ? <>To change Click On <strong>Income</strong> </> : <> To change Click On <strong> Expense</strong> </>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2}><input type='submit' className='btn btn-block btn-primary' value="Save" onClick={update} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
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