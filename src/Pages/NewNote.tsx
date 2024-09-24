import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm";
interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}
function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <section>
      <h2 className="text-2xl ">New Note</h2>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </section>
  );
}

export default NewNote;
