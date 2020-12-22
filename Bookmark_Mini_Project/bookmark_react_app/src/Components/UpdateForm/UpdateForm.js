import React, { useState } from "react";

// Refactor into <Form> Component
const UpdateForm = ({ bookmarkid, bookmarks, setBookmarks }) => {
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateURL, setUpdateURL] = useState("");
    const handleNewTitle = (evt) => {
        setUpdateTitle(evt.target.value);
    }
    const handleNewURL = (evt) => {
        setUpdateURL(evt.target.value);
    }
    // Update title Handler
    const handleUpdateSubmit = async (evt) => {
        evt.preventDefault();
        const updateBookmarkObject = {
            // creates object of current-state during input
            title: updateTitle,
            url: updateURL
        };
        try {
            const response = await fetch(`http://localhost:3000/bookmarks/${bookmarkid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateBookmarkObject)
                // ** ^^^ up here change the database first 
            });
            const updatedBookmark = await response.json();
            // ** vvv then change current state 
            const insert = (arr, i, newItem) => [
                ...arr.slice(0, i),
                newItem,
                ...arr.slice(i)
            ]
            let myBookmarks = [...bookmarks];
            let index = myBookmarks.indexOf(updatedBookmark);
            const newArray = insert(myBookmarks, index, updatedBookmark)
            setBookmarks([...newArray]);
            // resets 
            setUpdateTitle("");
            setUpdateURL("");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form className="update-bookmark-form" onSubmit={handleUpdateSubmit}>
                <label htmlFor="updateTitle">Title:</label>
                <input id="updateTitle"
                    type="text"
                    value={updateTitle}
                    onChange={handleNewTitle}
                    placeholder="Update website title" />
                <label htmlFor="updateURL">URL:</label>
                <input id="updateURL"
                    type="text"
                    value={updateURL}
                    onChange={handleNewURL}
                    placeholder="Update website url (http/https)" />
                <button type="submit">Change Bookmark!</button>
            </form>
        </>
    )
}

export default UpdateForm;