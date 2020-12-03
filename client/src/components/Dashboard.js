import React, { Fragment, useState, useEffect } from 'react'
import  { toast } from 'react-toastify'

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await fetch(
                "http://localhost:5000/dashboard/", {
                    method: "GET",
                    headers: {token: localStorage.token}
                })

                const parseRes = await response.json()

                setName(parseRes.firstname)
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("You Logged Out!")
    }

    useEffect(() => { getName() },[])

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <br></br>
            <h2>Hello {name}</h2>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            
        </Fragment>
    )
}

export default Dashboard