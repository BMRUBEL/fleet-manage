import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';

import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet';
import { getDatabase, ref, onValue} from "firebase/database";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  databaseURL: "https://newtest-94f13-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Tracking = () => {
    const [cars,setCar]=useState([]);
    useEffect(()=>{
        const starCountRef = ref(db, 'Cars/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        let dd=[];
        for(let d in data){
            dd.push(data[d])
        }
        setCar(dd)
        });
    },[])
    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Menu />
                <div className="content-wrapper">
                    

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        
                                        <div className="card-body">
                                        <MapContainer center={[23.8103,90.4125]} zoom={9} scrollWheelZoom={false}>
                                            <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            {
                                            cars.map((ds,i)=><Marker position={[ds.ln,ds.lt]} key={i}>
                                                <Popup>
                                                Vehicle Name: {ds.carName}<br/>
                                                Registration Number: {ds.carID}<br/> Driver: {ds.driver}<br/>
                                                Driver Phone: {ds.phone}<br/>
                                                Passenger Name:{ds.customerName}<br/>
                                                Passenger Phone:{ds.customerPhone}<br/>
                                                </Popup>
                                            </Marker>
                                            )
                                            }
                                        </MapContainer>
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

export default Tracking;
