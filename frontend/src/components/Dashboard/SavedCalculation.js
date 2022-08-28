import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import viewIcon from 'Assets/view file.svg'
import copyIcon from 'Assets/copy file.svg'
import downloadIcon from 'Assets/download file.svg'
import 'scss/Dashboard.scss'

export default function SavedCalculation(props) {

    const [data, setData] = useState({
        fileDescription: "File description",
        facility: "Facility name",
        customer: "Customer",
        date: "",
    })

    useEffect(() => {
        if (props.data) {
            setData(props.data);
        }
    }, [props.data])

    const seperator = (
        <ListGroup.Item className="vseperator" style={{ "maxWidth": "41px" }}>
            <div className="vline"></div>
        </ListGroup.Item>
    )

    return (
        <div>
            <ListGroup horizontal className="saved-calculation">
                <ListGroup.Item className="icons">
                    <img src={viewIcon} />
                    <img src={copyIcon} />
                    <img src={downloadIcon} />

                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="file-description field">
                    {data.fileDescription ? data.fileDescription : " "}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="facility field">
                    {data.facility ? data.facility : ' '}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="customer field">
                    {data.customer ? data.customer : ' '}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="date field">
                    {data.date.split('T')[0]}
                </ListGroup.Item>

                <ListGroup.Item className="delete">

                </ListGroup.Item>


            </ListGroup>

            <div className="hseperator">
                <div className="hline" />
            </div>
        </div>
    )
}
