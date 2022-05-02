import {Component} from "react";
import  "../../index.css"
class Section extends Component{

    render() {
        return(
            <div>
            <div className={"row"}>
                <div className={" col-6"} style={{ fontWeight:"normal", width: "100%" ,background:this.props.bg, height:this.props.height, color:this.props.color }}>{this.props.content}</div>
                <div className={" col-6"} style={{ fontWeight:"normal", width: "100%" ,background:this.props.bg, height:this.props.height, color:this.props.color }}>{this.props.loginIcon}<span className={"login-text"} >{this.props.title}</span></div>

            </div>
            <div className={"row"}>
                <div className={"col-12 info"} >
                    {this.props.info}

                </div>
            </div>
            </div>
        );
    }

}
export default Section;