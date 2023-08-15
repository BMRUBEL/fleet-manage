import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Menu from "../Menu";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Fuel_chart() {
  const p = useParams();
  const [vehicles, setvehicles] = useState([{ name: "", id: "" }]);
  const [vehicle, setvehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setdate] = useState("");
  const [qty, setqty] = useState("");
  const [chart, setChart] = useState([]);
  const stDate = localStorage.getItem("stDate");
  const enDate = localStorage.getItem("endDate");

  useEffect(() => {
    axios
      .post(
        "http://fleet.prantiksoft.com/backend/Fuel/fuel_graph",
        {
          id: p.id,
          startDate: stDate,
          endDate: enDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        let data = response.data;
        console.log(data.graph);
        setChart(data.graph);
      });
  }, []);

  // const labels = [];
  // const qt = [];
  // chart.map((d, i) => {
  //   labels.push(d.date);
  //   qt.push(d.qty);
  // });

  const data = {
    labels: chart.map((d) => d.date),
    datasets: [
      {
        label: "Scales of the Date",
        // data: qt,
        data: chart.map((d) => d.qty),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Vehicles fuel Consuming",
      },
    },
  };

  const save = () => {
    axios
      .post(
        "http://fleet.prantiksoft.com/backend/Fuel/fuel_graph",
        {
           id: p.id,

          // vehicle_id: vehicle,
          startDate: startDate,
          endDate: endDate,
        
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        let data = response.data;
        console.log(data.graph);
        setChart(data.graph);
      });
  };

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <Menu />
        <div className="content-wrapper pb-2 mb-0 ">
          <div className="content-header ">
            <div className="container-fluid">
              <div className="row mb-2 ">
                <div className="col-sm-6 ">
                  <h1 className="m-0 ">Fuel Graph Report</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Report</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Fuel Graph Report
                    </li>
                  </ol>
                </div>
                <h4 className="font-warning"></h4>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Fill Report From
                          <span className="form-required">*</span>
                        </label>

                        <input
                          type="date"
                          required="true"
                          className="form-control form-control-sm datepicker"
                          name="date"
                          onChange={(e) => setStartDate(e.target.value)}
                          value={startDate}
                          placeholder="Date From"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Fill Report to
                          <span className="form-required">*</span>
                        </label>

                        <input
                          type="date"
                          required="true"
                          className="form-control form-control-sm datepicker"
                          name="date"
                          onChange={(e) => setEndDate(e.target.value)}
                          value={endDate}
                          placeholder="Date to"
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="submit"
                        onClick={save}
                        className="btn btn-info"
                      >
                        Generate Report
                      </button>
                    </div>
                    {/* Content create */}
                    <div style={{ width: "890px", height: "460px" }}>
                      <Line data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
