import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `PROJECT - ${Date.now()}`,
            owner: "Hydeo Watase"
        });

        const newProject = response.data;

        setProjects([...projects, newProject]);
    }

    return (<>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <SafeAreaView style={styles.container}>
            <FlatList
                data={projects}
                keyExtractor={item => item.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project} key={project.id}>{project.title}</Text>
                )}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    button: {
        alignSelf: "stretch",
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",


    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    }
});