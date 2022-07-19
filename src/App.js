import {Component} from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import CalculatorPage from "./components/pages/CaculatorPage/CalculatorPage";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/comps/Header';
import logo from './Assets/Group 35.svg'
import login_icon from "./Assets/login_icon.svg";

class App extends Component{
render() {
    return(
        <Container fluid className='App'>
            <Header logo={logo} login_icon={login_icon}/>
            <CalculatorPage />

        </Container>
    );
}


}

export default App;
