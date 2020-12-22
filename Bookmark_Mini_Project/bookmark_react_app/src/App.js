import React, { useContext, useState, useEffect, useRef } from "react";
import Bookmark from "./Components/Bookmark/Bookmark";
import { BookmarkContext } from "./Context";
import './App.css';

function App() {
  // need to set it to []
  const [bookmarks, setBookmarks] = useState([]);
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  // Index Handler
  const fetchBookmarks = async () => {
    try {
      // by using proxy then fetch from "root" "/bookmarks"
      const response = await fetch("http://localhost:3000/bookmarks");
      const data = await response.json();
      // so then all the data gets placed inside the [] array
      setBookmarks(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Handler
  const handleDelete = async (id) => {
    try {
      // by using proxy then fetch from "root" "/bookmarks"
      const response = await fetch(`http://localhost:3000/bookmarks/${id}`, {
        // OPTIONS-object
        method: "DELETE",
        // must set the content-type headers
        headers: {
          "Content-Type": "application/json"
        }
        // ** ^^^ up here changes the database
      });
      const deletedBookmark = await response.json();

      // makes copy of bookmarks array state
      // ** vvv then down here need to change the 'state' array to reflect the delected doc-object
      let myBookmarks = [...bookmarks];
      // filters the array and returns array with items that only pass this filter
      myBookmarks = myBookmarks.filter((item) => item._id !== deletedBookmark._id);
      // replaces the state and doesn't merge it 
      setBookmarks(myBookmarks);
    } catch (error) {
      console.error(error);
    }
  };

  // Create Form Handler
  const handleNewTitle = (evt) => {
    setWebsiteTitle(evt.target.value);
  }
  const handleNewURL = (evt) => {
    setWebsiteURL(evt.target.value);
  }
  const handleCreateSubmit = async (evt) => {
    evt.preventDefault();
    const newBookmarkObject = {
      // creates object of current-state during input
      title: websiteTitle,
      url: websiteURL
    };
    try {
      const response = await fetch(`http://localhost:3000/bookmarks/`, {
        // OPTIONS-object
        method: "POST",
        // must set the content-type headers
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBookmarkObject)
      });
      const newBookmark = await response.json();
      // spread existing state of bookmarks, then add newBookmark to end of state
      setBookmarks([...bookmarks, newBookmark]);
      // resets 
      setWebsiteTitle("");
      setWebsiteURL("");
    } catch (error) {
      console.error(error);
    }
  };

  // Show Handler - ust open up in separate tab

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <BookmarkContext.Provider value={bookmarks}>
      <nav>
        <h1>Bookmarks</h1>
      </nav>
      <section className="">
        <h3>Add a bookmark!</h3>
        <form className="create-bookmark-form" onSubmit={handleCreateSubmit}>
          <label htmlFor="newTitle">Title:</label>
          <input id="newTitle"
            type="text"
            value={websiteTitle}
            onChange={handleNewTitle}
            placeholder="Add website title" />
          <label htmlFor="newURL">URL:</label>
          <input id="newURL"
            type="text"
            value={websiteURL}
            onChange={handleNewURL}
            placeholder="Add website url (http/https)" />
          <button type="submit">Add Bookmark!</button>
        </form>
      </section>

      <section>
        <div className="bookmarks">
          {bookmarks.map((currBookmark, index) => {
            return (
              <>
                <Bookmark key={currBookmark._id} bookmark={currBookmark} handleDelete={handleDelete} bookmarks={bookmarks} setBookmarks={setBookmarks} />
              </>
            );
          })}
        </div>
      </section>
    </BookmarkContext.Provider>
  );
}

export default App;