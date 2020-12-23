import React, { useState, useEffect } from "react";
import Bookmark from "./Components/Bookmark/Bookmark";
import CreateForm from "./Components/Form/CreateForm";
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // Read/Get-All/Index Handler
  const fetchBookmarks = async () => {
    try {
      const response = await fetch("http://localhost:3000/bookmarks");
      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete/Destroy Handler
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const deletedBookmark = await response.json();
      let myBookmarks = [...bookmarks];
      myBookmarks = myBookmarks.filter((item) => item._id !== deletedBookmark._id);
      setBookmarks(myBookmarks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <>
      <nav>
        <h1>Bookmarks</h1>
      </nav>
      <section className="">
        <h3>Add a bookmark!</h3>
        <CreateForm bookmarks={bookmarks} setBookmarks={setBookmarks}/> 
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
      </>
  );
}

export default App;