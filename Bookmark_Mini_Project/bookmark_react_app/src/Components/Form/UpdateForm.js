import React, { useRef } from "react";

const UpdateForm = ({ bookmarkid, bookmarks, setBookmarks, token }) => {
    const updateTitle = useRef(null);
    const updateURL = useRef(null);
    // Update Bookmark Handler 
    const handleUpdateSubmit = async (evt) => {
        evt.preventDefault();
        const title = updateTitle.current.value;
        const url = updateURL.current.value;
        const body = JSON.stringify({
            title, url
        });
        // resets input 
        evt.currentTarget.reset();
        try {
            const response = await fetch(`http://localhost:3000/bookmarks/${bookmarkid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body
            });
            const updatedBookmark = await response.json();
            const insert = (arr, i, newItem) => [
                ...arr.slice(0, i),
                newItem,
                ...arr.slice(i)
            ]
            let index = bookmarks.indexOf(updatedBookmark);
            const newArray = insert(bookmarks, index, updatedBookmark)
            setBookmarks([...newArray]);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form className="" onSubmit={handleUpdateSubmit}>
                <label htmlFor="updateTitle">Title:</label>
                <input id="updateTitle"
                    type="text"
                    ref={updateTitle}
                    placeholder="Update website title" />
                <label htmlFor="updateURL">URL:</label>
                <input id="updateURL"
                    type="text"
                    ref={updateURL}
                    placeholder="Update website url (http/https)" />
                <button type="submit">Change Bookmark!</button>
            </form>
        </>
    )
}

export default UpdateForm;