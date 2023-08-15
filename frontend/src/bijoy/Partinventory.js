import axios from 'axios';
import React,{useEffect,useState} from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

const Partinventory = () => {
    const navigate = useNavigate();
    const [stock, setstock] = useState([]);
    const [filterVal, setfilterVal] = useState('');
    const [searchParts, setsearchParts] = useState([]);
    const getparts = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Parts/get_stock',
            responseType: 'json'
        }).then(function (response) {
            // setstocklist(response.data.stock_out)
            setstock(response.data.stock);
            setsearchParts(response.data.stock);

        });
    }
    useEffect(() => {
        getparts()
    }, []);

    const handleFilter=(e)=>{
        if(e.target.value == ''){
            setstock(searchParts)
        }else{
            const filterResult= searchParts.filter(d=>d.name.toLowerCase().includes(e.target.value.toLowerCase()));
            if(filterResult.length > 0){
                setstock(filterResult)
            }else{
                setstock([{"name" : "No parts available in this name"}])
            }
            
        }
        setfilterVal(e.target.value)

    }
    const detailPart=(id)=>{
        navigate('/stock-details/' + id)
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
                                    <h1 className="m-0">Parts Inventory</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Parts Inventory</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <input type="search" className="m-0 form-control col-lg-3" placeholder='Search parts here' onChange={(e)=>handleFilter(e)} value={filterVal}/>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-striped table-bordered table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Stock</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stock.map((d,i)=>
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{d.name}</td>
                                                        <td>{d.details}</td>
                                                        <td>{d.stock}</td>
                                                        <td>{d.status}</td>
                                                        <td>
                                                        <button type="button" class="btn btn-outline-info btn-sm" onClick={() => detailPart(d.id)}>Details</button>
                                                        </td>
                                                    </tr>
                                                    )}

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

export default Partinventory;
