import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import "./index.css";

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
  const [orgs, setOrgs] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this state variable

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
    setIsLoading(true);
    try {
      const salesUrl = `https://glacial-shore-69830-91298bf010bb.herokuapp.com/abortion_data/api/data/${state}`;
      console.log(state);
      const response = await fetch(salesUrl);
      if (response.ok) {
        setVisible("visibile");
        const data = await response.json();
        setOrgs(data.clinics.response);
        console.log(orgs);
        if (data.data.policy == null) {
          setLMP("");
          setFiles("");
          setWaiting("");
        } else {
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
          if (data.data.policy["Last Updated"] != null) {
            setDate(data.data.policy["Last Updated"]);
          } else {
            setDate("No data");
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
        if (option == "Colorado") {
          setLMP("Legal in all stages of Pregnancy");
        }
        if (option == "Alaska") {
          setLMP("Legal in all stages of Pregnancy");
        }
        if (option == "Vermont") {
          setLMP("Legal in all stages of Pregnancy");
        }
        if (option == "Oregon") {
          setLMP("Legal in all stages of Pregnancy");
        }
        if (option == "New Mexico") {
          setLMP("Legal in all stages of Pregnancy");
        }
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false); // Set isLoading to false after data fetching is done
    }
  };

  const fetchData = async () => {
    const url =
      "https://glacial-shore-69830-91298bf010bb.herokuapp.com/abortion_data/api/data";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setStates(data.abortion_data);
    }
  };

  let message = LMP;

  if (LMP === 99) {
    message = "Not banned until after viability";
  } else if (LMP === 28) {
    message =
      "Banned in the third trimester (25 weeks pregnant, 28 since last period)";
  } else if (LMP === 22) {
    message = "Banned after fertilization (22 weeks since last period)";
  } else if (LMP === 24) {
    message = "Banned after implantation (27 weeks since last period)";
  } else if (LMP === 0) {
    message = "Banned in totality";
  }

  const lastUpdatedString = date;
  const lastUpdatedDate = new Date(lastUpdatedString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedLastUpdated = lastUpdatedDate.toLocaleDateString(
    "en-US",
    options,
  );

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
                    id={props.darkDrop}
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
                <button
                  onSubmit={handleSubmit}
                  className="button"
                  id={props.darkButton}
                >
                  Tell me.
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* { (files.length||insurance.length||waiting.length)?  */}

        <div>
          <div className={visibile}>
            <div className={props.darkcont}>
              <div className="data">
                <div>
                  {isLoading ? (
                    <p>Waiting for data...</p>
                  ) : (
                    <div>
                      {files != "No data" ? (
                        <>
                          <h2>Health exception:</h2>

                          <p>
                            {files ? files : "Allows for any health reason"}
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                      <div>
                        <h2>Banned after weeks pregnant:</h2>

                        <p>{message}</p>

                        <p></p>
                      </div>
                      <div>
                        {waiting != "No data" ? (
                          <>
                            <h2>Waiting period hours:</h2>
                            <p> {waiting ? waiting : "No waiting period"} </p>
                          </>
                        ) : (
                          ""
                        )}
                        {counsel != "No data" ? (
                          <>
                            <h2>Counseling visits required:</h2>
                            <p>{counsel ? counsel : "None required"}</p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <ul>
                        <h2>Insurance Info:</h2>
                        <li>
                          <p>
                            {insurance != "No data" ? (
                              <>
                                Medicaid exception for life or death
                                circumstances:
                                {insurance ? "Yes" : "No"}
                              </>
                            ) : (
                              ""
                            )}
                          </p>
                        </li>
                        <li>
                          <p>Exchange exception: {Health} </p>
                        </li>
                        <li>
                          <p>
                            Medicaid exception for R or I: {R ? "Yes" : "No"}{" "}
                          </p>
                        </li>
                      </ul>
                      {formattedLastUpdated === "Invalid Date" ? (
                        ""
                      ) : (
                        <p>Info Last Updated: {formattedLastUpdated}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Dropdown2;
