import React, { useState, useEffect } from "react";
import Bookmark from "./Components/Bookmark/Bookmark";
import CreateForm from "./Components/Form/CreateForm";
import RegisterForm from "./Components/Form/RegisterForm";
import LoginForm from "./Components/Form/LoginForm";
import './App.css';

/**
 * Note: I tried the "Hungry-For-More" and attempted to implement JWT Authentication, but I couldn't get a 
 * username to create a new 
 * bookmark entry inside the bookmark list once logged in. My bookmarks app was working correctly before I 
 * tried implementing JWT 
 * authentication, but it was good practice trying to get it to work.
 */

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [token, setToken] = useState("");
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
          "Content-Type": "application/json",
          "Authorization": token
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
    if (window.localStorage.getItem('token')) { 
      setToken(window.localStorage.getItem('token'))
    }
  }, []);

  return (
    <>
      <nav>
        <h1>Bookmarks</h1>
      </nav>
      <section className="">
        <RegisterForm token={token}/>
        <LoginForm token={token} setToken={setToken}/>
        
        {/* <hr/> */}
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