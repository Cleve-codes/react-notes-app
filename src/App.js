import { useState, useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import NotesList from "./components/NotesList";

const initialNotes = [];

export default function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [searchNote, setSearchNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      window.localStorage.getItem("react-notes-app-data")
    );
    if (savedNotes) {
      setNotes(savedNotes);
      console.log(savedNotes);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    console.log("notes", notes);
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      text,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
    };

    setNotes((initialNotes) => [...initialNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
    // console.log("clicked");
  };

  return (
    <div className={darkMode ? `dark-mode` : ""}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
        <Search handleSearchNote={setSearchNote} searchNote={searchNote} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchNote)
          )}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}
