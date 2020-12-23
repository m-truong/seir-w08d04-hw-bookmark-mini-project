import React, { useRef } from "react";
/**
 * Registers new user by making a fetch-request to the '/register' route handler located inside of 'server.js' in 
 * 'bookmark_express_api' directory, and creates new User 'document-object' inside the 'Users' collection.
 */
const RegisterForm = (props) => {
    const regNameInput = useRef(null);
    const regPasswordInput = useRef(null);

    //register 
    const registerHandler = async (evt) => {
        evt.preventDefault();
        const body = JSON.stringify({
            username: regNameInput.current.value,
            password: regPasswordInput.current.value
        })
        evt.currentTarget.reset();
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <h2>Register Form</h2>
            <form onSubmit={registerHandler}>
                <label> New Username:
            <input type="text" ref={regNameInput} placeholder="New username login"/>
                </label>
                <label> New Password:
            <input type="password" ref={regPasswordInput} placeholder="New password login"/>
                </label>
                <button type="submit">Submit!</button>
            </form>
        </>
    )
}

export default RegisterForm; 