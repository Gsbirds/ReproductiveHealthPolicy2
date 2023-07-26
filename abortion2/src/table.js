export default function Table1(props) {
  if (props.data === null) {
    return null;
  }

  const abortionObject= props.data.abortion
  const policyArray=props.data.data
  const waitingArray=props.data.waiting
  var state = "none"
  var health="none"
  var policy= "none"
  var waiting="none"


  if (abortionObject){
    console.log(Object.values(abortionObject))
    state = abortionObject.state
  if (policyArray){
    console.log(Object.values(policyArray))
    policy = policyArray.policy.banned_after_weeks_since_LMP
    health= policyArray.policy.exception_health
  }
  if (waitingArray){
    console.log(Object.values(waitingArray))
    waiting = waitingArray.policy.waiting_period_hours
  }
    return (

              <div>
                <h1>{state}</h1>
                <div>
                <h2>Type of health exception:</h2><p>{health}</p>
                </div>
                <div>
                <h2>Banned After weeks since LMP:</h2> <p>{policy}</p>
                </div>
                <div>
                <h2>Waiting period hours:</h2> <p>{waiting}</p>
                </div>
              </div>

    );
  }
  return (
    <div className="container" />
  );
}
