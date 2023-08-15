import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer'
import Menu from '../Menu'

export default function () {
  const [admin, setadmin] = useState([]);
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [age, setage] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [license_no, setlicense_no] = useState('');
  const [license_expire_date, setlicense_expire_date] = useState('');
  const [experience, setexprience] = useState('');
  const [joining_date, setjoiningdate] = useState('');
  const [reference, setreference] = useState('');
  const [address, setaddress] = useState('');
  const [status, setstatus] = useState('');
  const [photo, setphoto] = useState('');
  const [documents, setdocument] = useState('');
  const [msg, setmsg] = useState('');

  const save = () => {
    const formdata = new FormData();
    // formdata.append('admin_id',admin_id);
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    // formdata.append('role',role);
    formdata.append('phone', phone);
    formdata.append('age', age);
    formdata.append('license_no', license_no);
    formdata.append('experience', experience);
    formdata.append('license_expire_date', license_expire_date);
    formdata.append('joining_date', joining_date);
    formdata.append('reference', reference);
    formdata.append('address', address);
    formdata.append('status', status);
    formdata.append('photo', photo);
    formdata.append('documents', documents);
    fetch("http://fleet.prantiksoft.com/backend/Driver_controller/adddriver", {
      method: 'POST',
      body: formdata
    },
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
    setname('')
    setphone('')
    setage('')
    setemail('')
    setpassword('')
    setlicense_no('')
    setlicense_expire_date('')
    setexprience('')
    setjoiningdate('')
    setreference('')
    setaddress('')
    setstatus('')
    setphoto('')
    setdocument('')
    setTimeout(() => setmsg(''), 5000)

  };

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <Menu />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Driver</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Driver</li>
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
                      <h5 className="m-0">Add New Driver</h5>
                    </div>
                    <div className="card-body">
                      <h4>{msg}</h4>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group">
                              <label class="form-label">Driver Name<span class="form-required"></span></label>
                              <input type="text" name="name" className="form-control" id="exampleInputEmail1" required placeholder="Enter Name" onChange={(e) => setname(e.target.value)} value={name} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Phone</label>
                              <input type="text" name="phone" className="form-control" id="exampleInputEmail1" required placeholder="Enter Phone Number" onChange={(e) => setphone(e.target
                                .value)} value={phone} />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label class="form-label">Email<span class="form-required"></span></label>
                              <input type="text" name="email" className="form-control" id="exampleInputEmail1" required placeholder="Enter Email" onChange={(e) => setemail(e.target.value)} value={email} />
                            </div>

                            <div className="form-group">
                              <label for="exampleInputEmail1">Age</label>
                              <input type="text" name="age" className="form-control" id="exampleInputEmail1" placeholder="Enter Age" required onChange={(e) => setage(e.target.value)} value={age} />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label for="exampleInputEmail1">License Number</label>
                              <input type="text" name="license_no" className="form-control" id="exampleInputEmail1" placeholder="Enter License Number" required onChange={(e) => setlicense_no(e.target.value)} value={license_no} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input type="text" name="password" className="form-control" id="exampleInputEmail1" placeholder="Enter Password" required onChange={(e) => setpassword(e.target.value)} value={password} />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label for="exampleInputEmail1">Exprience</label>
                              <input type="text" name="experience" className="form-control" id="exampleInputEmail1" placeholder="Enter Exprience" required onChange={(e) => setexprience(e.target.value)} value={experience} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">License Expire Date</label>
                              <input type="date" name="license_expire_date" className="form-control" id="exampleInputEmail1" placeholder="Enter License Expire Date" required onChange={(e) => setlicense_expire_date(e.target.value)} value={license_expire_date} />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label for="exampleInputEmail1">Reference</label>
                              <input type="text" name="reference" className="form-control" id="exampleInputEmail1" placeholder="Enter Reference" required onChange={(e) => setreference(e.target.value)} value={reference} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Joining Date</label>
                              <input type="date" name="joining_date" className="form-control" required id="exampleInputEmail1" placeholder="Enter Joining Date" onChange={(e) => setjoiningdate(e.target.value)} value={joining_date} />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label for="exampleInputEmail1">Address</label>
                              <input type="text" name="address" className="form-control" id="exampleInputEmail1" placeholder="Enter Address" required onChange={(e) => setaddress(e.target.value)} value={address} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputFile">Photo</label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={(e) => setphoto(e.target.files[0])} />
                                  <label className="custom-file-label" for="exampleInputFile">Choose file</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label for="exampleInputFile">Document</label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input type="file" name="document" className="custom-file-input" id="exampleInputFile" onChange={(e) => setdocument(e.target.files[0])} />
                                  <label className="custom-file-label" for="exampleInputFile">Choose file</label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Status</label>
                              <input type="radio" name="status" id="exampleInputEmail1" placeholder="Enter Status" onChange={(e) => setstatus(e.target.value
                              )} value='active' />Active
                              <input type="radio" name="status" id="exampleInputEmail1" placeholder="Enter Status" onChange={(e) => setstatus(e.target.value
                              )} value='inactive' />Inactive

                            </div>
                          </div>
                          <div className="col-6">

                            <div className="form-group">
                              <label for="exampleInputEmail1"></label>
                              <input type="submit" className="btn btn-primary btn-block" value="Save" onClick={save} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                      </div>
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
  )
}
