import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../App";

interface NoteLayoutProps {
  notes: Note[];
}

function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();

  const note = notes.find((note) => note.id === id);

  if (note == null) {
    return <Navigate to={"/"} replace />;
  } else {
    return <Outlet context={note} />;
  }
}

export default NoteLayout;

export function useNote() {
  return useOutletContext<Note>();
}
