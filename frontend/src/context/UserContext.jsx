import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const userDataContext = createContext()

function UserContext({ children }) {
    const serverUrl = "https://virtual-assistant-ai.onrender.com"
    const [userData, setUserData] = useState(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    // Get current user
    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data)
            console.log('Current user:', result.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Ask assistant
    const getGeminiResponse = async (command) => {
        try {
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true })
            return result.data
        } catch (error) {
            console.log(error)
        }
    }

    // ✅ Update user
    const updateUser = async (updatedData) => {
        try {
            const result = await axios.put(
                `${serverUrl}/api/user/update`,
                updatedData,
                { withCredentials: true } // required if backend uses cookies
            )
            setUserData(result.data) // update frontend state
            console.log('User updated:', result.data)
            return result.data
        } catch (error) {
            console.error('Update failed:', error.response?.data || error.message)
            throw error
        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

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
        updateUser // added this
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
