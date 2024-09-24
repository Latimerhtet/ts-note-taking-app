import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm";
import { useNote } from "./NoteLayout";
interface EditNoteProps {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}
function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  return (
    <section>
      <h2 className="text-2xl ">Edit Note</h2>
      <NoteForm
        title={note.title}
        description={note.description}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </section>
  );
}

export default EditNote;
