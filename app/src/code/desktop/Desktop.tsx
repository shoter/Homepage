import React, { Component } from "react"
import TaskBar from "./TaskBar";

export default class Desktop extends Component 
{
    render()
    {
        return ( <div className="desktop">
            <div className="work-area">
                <div className="InformPeopleAboutNewBlog">
                    My homepage is under construction. It will come to completion shortly. 
                    Deployed using Ci/CD with Jenkins.
                </div>
            </div>
            <TaskBar />
        </div>
        )
    }
}