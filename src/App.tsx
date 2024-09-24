import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./layout/Main";
import NewNote from "./Pages/NewNote";
import Home from "./Pages/Home";
import { useLocalStorage } from "./utils/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteLayout from "./Pages/NoteLayout";
import Note from "./Pages/Note";
import EditNote from "./Pages/EditNote";
export interface Note extends NoteData {
  id: string;
}
interface RawNote extends RawNoteData {
  id: string;
}

interface RawNoteData {
  title: string;
  description: string;
  tagsId: string[];
}
export interface NoteData {
  title: string;
  description: string;
  tags: Tag[];
}
export interface Tag {
  id: string;
  label: string;
}
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsId.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsId: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsId: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home notes={notesWithTags} availableTags={tags} />,
        },
        {
          path: "/new",
          element: (
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          ),
        },
        {
          path: "/:id",
          element: <NoteLayout notes={notesWithTags} />,
          children: [
            { index: true, element: <Note /> },
            {
              path: "/:id/edit",
              element: (
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={onAddTag}
                  availableTags={tags}
                />
              ),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
