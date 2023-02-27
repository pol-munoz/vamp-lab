import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './RecentProjects.css'
import Button from '../../../components/Button/Button'
import RecentProjectItem from './RecentProjectItem/RecentProjectItem'
import {StoreContext} from '../../StoreContext'

export default function RecentProjects() {
    const [recentProjects, setRecentProjects] = useState([])
    const { dispatch } = useContext(StoreContext)
    const navigate = useNavigate()

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
            dispatch({
                type: 'setActiveProject',
                payload: project
            })
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
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <h2 className="Vamp-title">Projects</h2>
                <div className="Vamp-header-buttons">
                    <Button onClick={createNewProject}>New</Button>
                    <Button onClick={openExistingProject}>Open</Button>
                </div>
            </div>
            <div className="Vamp-screen-list">
                {recent.length > 0 ? recent : <p className="Vamp-placeholder">Recent projects will appear here</p> }
            </div>
        </div>
    )

}