import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// Create context
export const userDataContext = createContext()

function UserContext({ children }) {
    const serverUrl = "https://virtual-assistant-ai.onrender.com"

    // State
    const [userData, setUserData] = useState(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    // Fetch current logged-in user
    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data)
            console.log('Current user:', result.data)
        } catch (error) {
            console.error('Error fetching current user:', error)
        }
    }

    // Ask assistant (Gemini)
    const getGeminiResponse = async (command) => {
        try {
            const result = await axios.post(
                `${serverUrl}/api/user/asktoassistant`,
                { command },
                { withCredentials: true }
            )
            return result.data
        } catch (error) {
            console.error('Error getting assistant response:', error)
        }
    }

    // Update user data
    const updateUser = async (updatedData) => {
        try {
            const result = await axios.put(
                `${serverUrl}/api/user/update`,
                updatedData,
                { withCredentials: true }
            )
            setUserData(result.data)
            console.log('User updated:', result.data)
            return result.data
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message)
            throw error
        }
    }

    // Fetch current user on mount
    useEffect(() => {
        handleCurrentUser()
    }, [])

    // Context value
    const value = {
        serverUrl,
        userData,
        setUserData,
        backendImage,
        setBackendImage,
        frontendImage,
        setFrontendImage,
        selectedImage,
        setSelectedImage,
        getGeminiResponse,
        updateUser
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
