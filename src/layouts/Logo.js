//import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import logo from '../assets/images/logos/logo.PNG'
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="not found" height="80px" width="100%" style={{marginLeft:"2rem"}} />
      {/* <LogoDark /> */}
      {/* <h4>HiTechGroupIndia</h4> */}
    </Link>
  );
};

export default Logo;
