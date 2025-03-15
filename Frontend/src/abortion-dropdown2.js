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
    setOption(value);
    setState(value);  // Use the state name directly
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!state) {
      console.error('No state selected');
      return;
    }
    
    setIsLoading(true);
    try {
      const salesUrl = `https://glacial-shore-69830-91298bf010bb.herokuapp.com/api/data/${state}/`;
      
      const response = await fetch(salesUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = JSON.parse(responseText);
      
      setVisible("visible");
      
      if (data.clinics && data.clinics.response) {
        setOrgs(data.clinics.response);
      }
      
      if (!data.data || !data.data.policy) {
        setLMP("");
        setFiles("");
        setWaiting("");
      } else {
        setFiles(data.data.policy.exception_health || "No data");
        setLMP(data.data.policy.banned_after_weeks_since_LMP || "No data");
        setDate(data.data.policy["Last Updated"] || "No data");
      }
      
      if (data.waiting && data.waiting.policy) {
        setWaiting(data.waiting.policy.waiting_period_hours || "No data");
        setCounsel(data.waiting.policy.counseling_visits || "No data");
      } else {
        setWaiting("No data");
        setCounsel("No data");
      }
      
      if (data.insurance && data.insurance.policy) {
        setInsurance(data.insurance.policy.medicaid_exception_life || "No data");
        setHealth(data.insurance.policy.exchange_exception_health || "No data");
        setR(data.insurance.policy.medicaid_exception_rape_or_incest || "No data");
      } else {
        setInsurance("No data");
        setHealth("No data");
        setR("No data");
      }
      
      // Override LMP for specific states
      const legalStates = ["Colorado", "Alaska", "Vermont", "Oregon", "New Mexico"];
      if (legalStates.includes(state)) {
        setLMP("Legal in all stages of Pregnancy");
      }
      
    } catch (error) {
      console.error('Error:', error);
      setVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const url = "https://glacial-shore-69830-91298bf010bb.herokuapp.com/api/data/";
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      try {
        const data = JSON.parse(responseText);
        
        if (data && data.abortion_data) {
          setStates(data.abortion_data);
        } else {
          console.error('No abortion_data in response:', data);
          setStates([]);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text was:', responseText);
        setStates([]);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStates([]);
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
                    {states.map((state, index) => {
                      return (
                        <option key={`state-${index}`} value={state.state}>
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
