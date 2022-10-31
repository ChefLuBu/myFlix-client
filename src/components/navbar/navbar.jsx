import {Link} from "react-router-dom";
import "./navbar.scss"

const NavBar = (props) => {
    return (<div>
        <Link to={"/"} ><h1>Kung Fu Flix</h1></Link>
    </div>
    );
}
 
export default NavBar;