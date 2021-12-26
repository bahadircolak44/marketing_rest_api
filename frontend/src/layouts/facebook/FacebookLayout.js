import {Link,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import renderRoutes from "../../utils/renderRoutes";

const FacebookLayout = (props) => {
    const { route } = props
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/" className="navbar-brand" style={{paddingLeft: 15}}>
                    Marketing APP
                </a>
                {/*<div className="bg-white" style={{height: '40px', width: 1}}> </div>*/}
                <div style={{paddingLeft: 10}} className="navbar-nav mr-auto">
                    {route.routes.map((item, index) => (
                        <li className="nav-item">
                            <Link to={item.path} className="nav-link text-white navbar-text">
                                {item.name}
                            </Link>
                        </li>
                    ))}

                </div>
            </nav>
            <div className="container mt-3">
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};


export default FacebookLayout;
