import React, { useState } from "react";
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
        date: new Date(),
    })

    const seperator = (
        <ListGroup.Item className="vseperator">
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
                    {data.fileDescription}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="facility field">
                    {data.facility}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="customer field">
                    {data.customer}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="date field">
                    {data.date.toLocaleDateString()}
                </ListGroup.Item>

                {seperator}

                <ListGroup.Item className="delete">

                </ListGroup.Item>


            </ListGroup>

            <div className="hseperator">
                <div className="hline" />
            </div>
        </div>
    )
}
