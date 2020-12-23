import React, { useState, useRef } from "react";

const CreateForm = ({ bookmarks, setBookmarks, token }) => {
    const websiteTitle = useRef(null);
    const websiteURL = useRef(null);
    // Create Bookmark Handler 
    const handleCreateSubmit = async (evt) => {
        evt.preventDefault();
        const title = websiteTitle.current.value;
        const url = websiteURL.current.value;
        const body = JSON.stringify({
            title, url
        });
        // resets input 
        evt.currentTarget.reset();
        try {
            const response = await fetch(`http://localhost:3000/bookmarks/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body
            });
            const newBookmark = await response.json();
            setBookmarks([...bookmarks, newBookmark]);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <form className="" onSubmit={handleCreateSubmit}>
                <label htmlFor="newTitle">Title:</label>
                <input id="newTitle"
                    type="text"
                    ref={websiteTitle}
                    placeholder="Add website title" /> 
                <label htmlFor="newURL">URL:</label>
                <input id="newURL"
                    type="text"
                    ref={websiteURL}
                    placeholder="Add website url (http/https)" />
                <button type="submit">Add Bookmark!</button>
            </form>
        </>
    )
}

export default CreateForm;