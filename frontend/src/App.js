import { Component, React } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import CalculatorPage from "./components/Calculator/CalculatorPage";
import Header from './components/Header';
import logo from './Assets/Group 35.svg'
import login_icon from "./Assets/login_icon.svg";
import UserContext from "./components/context";
import {Switch, Route} from "react-router-dom"
import Footer from "./components/Footer";


class App extends Component {
    state = {
        data: null,
    }
    componentDidMount() {
        this.connectToExpress()
    }

    connectToExpress() {
        this.callBackendAPI()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    callBackendAPI = async () => {
        const response = await fetch('/');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    render() {
        return (
            <UserContext.Provider value={{username: undefined}}>
                <div className='App'>
                    <Header logo={logo} login_icon={login_icon} />
                    <CalculatorPage />
                    <Footer/>
                </div>
            </UserContext.Provider>
        );
    }


}

export default App;
