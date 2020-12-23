import React, { useState } from "react";
import UpdateForm from "../Form/UpdateForm";

const Bookmark = ({ bookmark, handleDelete, bookmarks, setBookmarks }) => {
    const [showUpdateForm, toggleUpdateForm] = useState(false);
    const handleShowUpdateForm = () => {
        toggleUpdateForm(!showUpdateForm);
    };
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
                onClick={(evt) => {
                    handleShowUpdateForm();
                }}
            >
                {"↩️"}
            </button>
            <p>{!!showUpdateForm && <UpdateForm bookmarkid={bookmark._id} bookmarks={bookmarks} setBookmarks={setBookmarks} />}</p>
        </div>
    )
}

export default Bookmark;