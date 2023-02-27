import React, {Component} from 'react'
import './ProjectManager.css'
import Button from '../../../components/Button/Button'
import RecentProjectItem from './RecentProjectItem/RecentProjectItem'

function createNewProject() {
    window.projects.create()
}

function openExistingProject() {
    window.projects.open()
}

export default class ProjectManager extends Component {
    state = {
        recentProjects: []
    }

    listener = (event, recentProjects) => {
        this.setState({recentProjects})
    }

    componentDidMount() {
        let init = async () => {
            this.setState({ recentProjects: await window.projects.getRecents() })
        }
        init().then(() => {
            window.projects.onRecentUpdate(this.listener)
        })
    }

    componentWillUnmount() {
        window.projects.offRecentUpdate(this.listener)
    }

    render() {
        let recent = this.state.recentProjects.map(recentProject => (
            <RecentProjectItem project={recentProject} key={recentProject.path}/>
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
}