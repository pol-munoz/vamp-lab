import * as React from 'react';
import "./ProjectManager.css";
import Button from "../../../components/Button/Button";

function createNewProject() {
    console.log("NEW")
}

function openExistingProject() {
    console.log("OPEN")
}

export default function ProjectManager() {
    return (
        <div className="ProjectManager">
            <div className="App-header ProjectManager-header">
                <h2 className="App-title">Projects</h2>
                <div className="ProjectManager-header-buttons">
                    <Button onClick={createNewProject}>New</Button>
                    <Button onClick={openExistingProject} disabled>Open</Button>
                </div>
            </div>
            <div className="ProjectManager-list">

            </div>
        </div>
    );
}