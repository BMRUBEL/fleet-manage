import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const [mail, setmail] = useState('');
     const [pass, setpass] = useState('');
     const [error, seterror] = useState('Sign in to start your session');
     const navigate=useNavigate();
     const login=()=>{
        axios.post('http://fleet.prantiksoft.com/backend/Login', {
        email: mail,
        password: pass
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        let data=response.data;
        console.log(data);
        if(data.status==true){
          localStorage.setItem('token',data.token)
          localStorage.setItem("name",data.name)
          
          navigate("/dashboard");
        }else{
          seterror('Something went wrong!')
        }
      })
     }
     useEffect(() => {
        let token=localStorage.getItem('token')
        if(token!=null){
          navigate("/dashboard");
        }
      }, []);
    return (
        <>
            <div className='hold-transition login-page'>
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Admin</b>Panel</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">{error}</p>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" onChange={(e)=>setmail(e.target.value)}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e)=>setpass(e.target.value)}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">

                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block" onClick={login}>Sign In</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
