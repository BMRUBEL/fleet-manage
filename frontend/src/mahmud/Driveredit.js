import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu'

export default function Driveredit() {
  const [id, setid] = useState('');
  const [name, setname] = useState('');
  // const [role, setrole] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setphone] = useState('');
  const [age, setage] = useState('');
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
  const p = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('http://fleet.prantiksoft.com/backend/Driver_controller/editdriver', {
      id: p.id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    }).then(function (response) {
      let data = response.data;
      console.log(data);
      setname(data.user.name);
      setemail(data.user.email);
      setphone(data.user.phone);
      setpassword(data.user.password);
      setage(data.user.age);
      setlicense_no(data.user.license_no);
      setlicense_expire_date(data.user.license_expire_date);
      setexprience(data.user.experience);
      setjoiningdate(data.user.joining_date);
      setreference(data.user.reference);
      setaddress(data.user.address);
      setstatus(data.user.status);
      // setrole(data.user.role);
      setphoto(data.user.photo);
      setdocument(data.user.documents);
      setid(data.user.admin_id);
    });
  }, []);
  const update = () => {
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
    formdata.append('id', id);
    fetch("http://fleet.prantiksoft.com/backend/Driver_controller/updatedriver", {
      method: 'POST',
      body: formdata
    },
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
    // let data = response.data;
    //   setmsg(data.msg)
    setTimeout(() => navigate('/driverlist'), 5000);


    // axios.post('http://fleet.prantiksoft.com/backend/Driver_controller/updatedriver', {
    //   role: role,
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   age: age,
    //   license_no: license_no,
    //   license_expire_date: license_expire_date,
    //   experience: experience,
    //   joining_date: joining_date,
    //   reference: reference,
    //   address: address,
    //   status: status,
    //   photo: photo,
    //   document: document,
    //   id: p.id
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem('token')
    //   }
    // }).then(function (response) {
    //   let data = response.data;
    //   setmsg(data.msg)
    //   setTimeout(() => navigate('/driverlist'), 5000)

    // })
  }
  return (<div className="hold-transition sidebar-mini">
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
              <div className="col-md-12">
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h5 className="m-0">Edit driver</h5>
                  </div>
                  <div className="card-body">
                    <h4>{msg}</h4>
                    <div action="" method="post" enctype="multipart/form-data">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group">

                              <input type="hidden" name="id" value={id} className="custom-file-input" id="exampleInputFile" onChange={(e) => setid(e.target.value)} />

                              <label for="exampleInputEmail1">Name</label>
                              <input type="text" name="name" className="form-control" id="exampleInputEmail1" onChange={(e) => setname(e.target.value)} value={name} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Email</label>
                              <input type="text" name="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setemail(e.target
                                .value)} value={email} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">License Number</label>
                              <input type="text" name="license_no" className="form-control" id="exampleInputEmail1" onChange={(e) => setlicense_no(e.target.value)} value={license_no} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">License Expire Date</label>
                              <input type="date" name="license_expire_date" className="form-control" id="exampleInputEmail1" onChange={(e) => setlicense_expire_date(e.target.value)} value={license_expire_date} autocomplete="off" aria-invalid="false" />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input type="text" name="password" className="form-control" id="exampleInputEmail1" onChange={(e) => setpassword(e.target.value)} value={password} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputFile">Document</label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input type="file" name="documents" className="custom-file-input" id="exampleInputFile" onChange={(e) => setdocument(e.target.files[0])} />
                                  <label className="custom-file-label" for="exampleInputFile">Choose file</label>                                
                                </div>                             
                              </div>
                              <label for="exampleInputEmail1"><img src={`http://fleet.prantiksoft.com/backend/uploads/${documents}`} alt="" height={50} weidth={50} /> </label>
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Status</label>
                              {/* <input type="text" name="status" className="form-control" id="exampleInputEmail1" onChange={(e) => setstatus(e.target.value
                              )} value={status} /> */}

                              {(status == 'active') ? <>
                                <input type="radio" name="status" className="" id="exampleInputEmail1" onChange={(e) => setstatus(e.target.value)} checked value='active' />
                                <label> Active </label>
                              </> : <>
                                <input type="radio" name="status" className="" id="exampleInputEmail1" onChange={(e) => setstatus(e.target.value)} value='active' />
                                <label>Active</label>
                              </>
                              }

                              {(status == 'inactive') ? <>
                                <input type="radio" name="status" className="" id="exampleInputEmail1" onChange={(e) => setstatus(e.target.value)} checked value='inactive' />
                                <label> InActive </label>
                              </> : <>
                                <input type="radio" name="status" className="" id="exampleInputEmail1" onChange={(e) => setstatus(e.target.value)} value='inactive' />
                                <label>InActive</label>
                              </>
                              }
                              {/* <br></br>
                              {(status == 'active') ? <>To Inactive Click on <strong>Inactive</strong> </> : <>To Active Click on <strong>Active</strong> </>} */}
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label for="exampleInputEmail1">Phone</label>
                              <input type="text" name="phone" className="form-control" id="exampleInputEmail1" onChange={(e) => setphone(e.target
                                .value)} value={phone} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Age</label>
                              <input type="text" name="age" className="form-control" id="exampleInputEmail1" onChange={(e) => setage(e.target.value)} value={age} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Exprience</label>
                              <input type="text" name="experience" className="form-control" id="exampleInputEmail1" onChange={(e) => setexprience(e.target.value)} value={experience} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Joining Date</label>
                              <input type="date" name="joining_date" className="form-control" id="exampleInputEmail1" onChange={(e) => setjoiningdate(e.target.value)} value={joining_date} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Reference</label>
                              <input type="text" name="reference" className="form-control" id="exampleInputEmail1" onChange={(e) => setreference(e.target.value)} value={reference} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Address </label>
                              <input type="text" name="address" className="form-control" id="exampleInputEmail1" onChange={(e) => setaddress(e.target.value)} value={address} />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputFile">Photo</label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={(e) => setphoto(e.target.files[0])} />
                                  <label className="custom-file-label" for="exampleInputFile">Choose file</label>
                                </div>
                              </div>
                              <label for="exampleInputEmail1"><img src={`http://fleet.prantiksoft.com/backend/uploads/${photo}`} alt="" height={50} weidth={50} /> </label>
                            </div>  
                          </div>


                          <div className='col-md-12'>
                            <div className="form-group">
                              <label for="exampleInputEmail1"></label>
                              <input type="submit" className="btn btn-primary btn-block" value="Update" onClick={update} />
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

      </div>

      <Footer />
    </div>
  </div>
  )
}
