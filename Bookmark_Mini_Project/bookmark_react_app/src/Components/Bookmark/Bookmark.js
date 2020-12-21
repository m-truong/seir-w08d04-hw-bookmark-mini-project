import React, { useState, useEffect, useContext } from "react";
import { BookmarkContext } from "../../Context";

// Refactor into <Form> Component
const UpdateForm = ({bookmarkid}) => {
    return (
        <>
        <form>
            <input></input>
        </form>
        </>
    )
}
// Refactor into <Bookmark> Component
const Bookmark = ({ bookmark, handleDelete }) => {
    const [showUpdateForm, toggleUpdateForm] = useState(false);
    const handleShowUpdateForm = () => {
        toggleUpdateForm(!showUpdateForm);
    };
    const { bookmarks } = useContext(BookmarkContext);
    return (
        <div className="">
            <a href={bookmark.url} target="_blank"><span className="bookmarkTitle" key={bookmark._id}>{bookmark.title}</span></a>
            <button
                onClick={(evt) => {
                    handleDelete(bookmark._id);
                }}
            >
                {"✖️"}
            </button>
            <button
                onClick={ () => {
                    handleShowUpdateForm();
                }}
            >
                {"↩️"}
            </button>
            <p>{!!showUpdateForm && <UpdateForm bookmarkid={bookmark._id}/>}</p>
        </div>
    )
}

export default Bookmark;