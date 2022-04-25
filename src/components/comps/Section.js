import {Component} from "react";
import  "../../index.css"
class Section extends Component{

    render() {
        return(
            <div>
                <div className={"menu"} style={{display: "block" ,position:"relative", left:0, right:0, width: "100%" ,background:this.props.bg, height:this.props.height, color:this.props.color }}>{this.props.content}</div>

            </div>

        );
    }

}
export default Section;