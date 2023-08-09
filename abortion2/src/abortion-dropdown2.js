import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import "./index.css";
import Chat from "./Chat";

function Dropdown2(props) {
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [option, setOption] = useState("");
  const [files, setFiles] = useState("");
  const [waiting, setWaiting] = useState("");
  const [insurance, setInsurance] = useState("");
  const [Health, setHealth] = useState("");
  const [LMP, setLMP] = useState("");
  const [R, setR] = useState("");
  const [counsel, setCounsel] = useState("");
  const [visibile, setVisible] = useState("invisible");
  const [orgs, setOrgs]=useState("")

  const handleOptionChange = (e) => {
    const value = e.target.value;
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setOption(value);
    setState(option);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const salesUrl = `https://glacial-shore-69830-91298bf010bb.herokuapp.com/abortion_data/api/data/${state}`;
   
    const response = await fetch(salesUrl);
    if (response.ok) {
      setVisible("visibile");
      const data = await response.json();
      setOrgs(data.clinics.response)
      console.log(orgs)
      if (data.data.policy.exception_health != null) {
        setFiles(data.data.policy.exception_health);
      } else {
        setFiles("No data");
      }
      if (data.data.policy.banned_after_weeks_since_LMP != null) {
        setLMP(data.data.policy.banned_after_weeks_since_LMP);
      } else {
        setLMP("No data");
      }

      if (data.waiting.policy != null) {
        setWaiting(data.waiting.policy.waiting_period_hours);
      } else {
        setWaiting("No data");
      }
      if (data.waiting.policy != null) {
        setCounsel(data.waiting.policy.counseling_visits);
      } else {
        setCounsel("No data");
      }
      if (data.insurance.policy != null) {
        setInsurance(data.insurance.policy.medicaid_exception_life);
      } else {
        setInsurance("No data");
      }
      if (data.insurance.policy.exchange_exception_health != null) {
        setHealth(data.insurance.policy.exchange_exception_health);
      } else {
        setHealth("No data");
      }
      if (data.insurance.policy.medicaid_exception_rape_or_incest != null) {
        setR(data.insurance.policy.medicaid_exception_rape_or_incest);
      } else {
        setR("No data");
      }

    }
  };

  const fetchData = async () => {
    const url = "https://glacial-shore-69830-91298bf010bb.herokuapp.com/abortion_data/api/data";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setStates(data.abortion_data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <body className={props.dark}>
        <div className="tableform">
          <div className="row">
            <div className="offset-3 col-6">
              <h1>Find out.</h1>
              <form id="create-location-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select
                    onChange={handleOptionChange}
                    required
                    name="state"
                    value={option}
                    className="forms"
                  >
                    <option>Pick a state</option>
                    {states.map((state) => {
                      return (
                        <option id={state.id} key={state.id} defaultValue="">
                          {state.state}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button onSubmit={handleSubmit} className="button">
                  Tell me.
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className={visibile}>
            <div className={props.darkcont}>
              <div className="data">
                <div>
                  <h2>Health exception:</h2>
                  <p>{files ? files : "Allows for any health reason"}</p>
                </div>
                <div>
                  <h2>Banned After weeks since LMP:</h2>
                  <p>{LMP}</p>
                </div>
                <div>
                  <h2>Waiting period hours:</h2>{" "}
                  <p> {waiting ? waiting + " hours" : "No waiting period"} </p>
                  <h2>Counseling visits required:</h2>{" "}
                  <p>{counsel ? counsel : "None required"}</p>
                </div>

                <ul>
                  <h2>Insurance Info:</h2>
                  <li>
                    <p>
                      Medicaid exception for life or death circumstances:
                      {insurance ? "Yes" : "No"}
                    </p>
                  </li>
                  <li>
                    <p>Exchange exception: {Health} </p>
                  </li>
                  <li>
                    <p>Medicaid exception for R or I: {R ? "Yes" : "No"} </p>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
{/* 
        <div className={visibile}>
            <div className={props.darkcont}>
              <h2>Abortion Organization Info: </h2>
              <div className="data">
                
              <li>
                    <p>{orgs} </p>
                  </li> */}
{/* </div> */}
{/* </div>
</div> */}
        {/* <div> <h1 className="talk"> Need someone to talk to? </h1></div>
        < Chat /> */}
      </body>
    </>
  );
}

export default Dropdown2;
