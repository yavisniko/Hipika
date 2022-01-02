import { FC } from "react";
import Form from './Form'
import "../../less/Signup-styles/style.css";

const SignMain: FC<{showNavbar: () => void}> = ({showNavbar}) => {
  return (
    <div className="container">
      <div className="signup-text">Sign up</div>
      <Form showNavbar={showNavbar}/>
    </div>
  );
};

export default SignMain;
