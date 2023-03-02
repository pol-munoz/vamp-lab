import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './RecentProjects.css'
import Button from '../../../components/Button/Button'
import RecentProjectItem from './RecentProjectItem/RecentProjectItem'
import {StoreContext} from '../../StoreContext'
import {SET_ACTIVE_PROJECT} from '../ActiveProject/ActiveProjectReducer'

export default function RecentProjects() {
    const [recentProjects, setRecentProjects] = useState([])
    const { dispatch } = useContext(StoreContext)
    const navigate = useNavigate()


    let navigateToProject = project => {
        if (project) {
            dispatch({
                type: SET_ACTIVE_PROJECT,
                payload: {project}
            })
            navigate('/project/home')
        }
    }

    useEffect(() => {
        let init = async () => {
            setRecentProjects(await window.projects.getRecent())
        }
        void init()
        window.projects.nativeOpenSubscribe((_, data) => navigateToProject(data))

        return () => window.projects.nativeOpenUnSubscribe()
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

    let removeRecentProject = async recentProject => {
        setRecentProjects(await window.projects.removeRecent(recentProject))
    }

    let recent = recentProjects.map(recentProject => (
        <RecentProjectItem project={recentProject} key={recentProject.id}
                           onOpenClick={openRecentProject} onRemoveClick={removeRecentProject}
        />
    ))

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <h2 className="Vamp-title">Projects</h2>
                <div className="Vamp-row">
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