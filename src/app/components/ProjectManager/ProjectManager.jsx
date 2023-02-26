import * as React from 'react';
import "./ProjectManager.css";
import Button from "../../../components/Button/Button";

function createNewProject() {
    window.projects.create()
}

function openExistingProject() {
    window.projects.open()
}

export default function ProjectManager() {
    let recent = []

    return (
        <div className="ProjectManager">
            <div className="App-header ProjectManager-header">
                <h2 className="App-title">Projects</h2>
                <div className="ProjectManager-header-buttons">
                    <Button onClick={createNewProject}>New</Button>
                    <Button onClick={openExistingProject}>Open</Button>
                </div>
            </div>
            <div className="ProjectManager-list">
                {recent.length === 0 ? <p className="App-placeholder">Recent projects will appear here</p> : recent}
            </div>
        </div>
    );
}