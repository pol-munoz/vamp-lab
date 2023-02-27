import React, {useState, useEffect} from 'react'
import {useNavigate, useOutletContext} from 'react-router-dom'
import './ProjectManager.css'
import Button from '../../../components/Button/Button'
import RecentProjectItem from './RecentProjectItem/RecentProjectItem'

export default function ProjectManager(props) {
    const [recentProjects, setRecentProjects] = useState([])
    const navigate = useNavigate()
    const [_, setActiveProject] = useOutletContext();
    console.log('RENDER ProjectManager')

    useEffect(() => {
        let init = async () => {
            setRecentProjects(await window.projects.getRecent())
        }
        void init()
    }, [])


    let createNewProject = async () => {
        let project = await window.projects.create()
        navigateToProject(project)
    }

    let openExistingProject = async () => {
        let project = await window.projects.open()
        navigateToProject(project)
    }

    let openRecentProject = async recentProject => {
        let project = await window.projects.openRecent(recentProject)
        navigateToProject(project)
    }

    let navigateToProject = project => {
        if (project) {
            setActiveProject(project)
            navigate('/project/home')
        }
    }

    let deleteRecentProject = async recentProject => {
        setRecentProjects(await window.projects.deleteRecent(recentProject))
    }

    let recent = recentProjects.map(recentProject => (
        <RecentProjectItem project={recentProject} key={recentProject.path}
                           onOpenClick={openRecentProject} onDeleteClick={deleteRecentProject}
        />
    ))

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
    )

}