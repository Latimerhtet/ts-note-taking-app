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

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }
  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }
  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: (
            <Home
              notes={notesWithTags}
              availableTags={tags}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          ),
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
            { index: true, element: <Note onDelete={onDeleteNote} /> },
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
