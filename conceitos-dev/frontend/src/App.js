import React, { useState, useEffect } from 'react';
import api from './services/api'
import Header from './components/Header'
import './App.css'

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        //setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projects', {
            "title": `Novo projeto ${Date.now()}`,
            "owner": "Hydeo"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Home Page" />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Add project</button>
        </>);
}

export default App;