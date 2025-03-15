import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import "./index.css";

function Contact(props) {
  const [visibile, setVisible] = useState("visible");

  return (
    <>
      <body className={props.dark}>
        <div>
          <div className={visibile}>
            <div className={props.darkcont}>
              <div className="data">
                <h4>Developer and website founder:</h4>
                <h4>Gabby Burgard</h4>
                <p>E-mail: gabbyburgard@the-gabby.com</p>
                <p>
                  I strive to bring updated and relevent information to women in
                  every state of the United States. If you find something on the
                  site that is not accurate, or something you'd like me to
                  improve, please do not hesitate to send me an e-mail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Contact;
