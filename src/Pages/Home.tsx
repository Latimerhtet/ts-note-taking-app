import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { useMemo, useState } from "react";
import NoteCard from "../components/NoteCard";
import TagUpdateModal from "../components/TagUpdateModal";

interface NoteListProps {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}

function Home({ availableTags, notes, updateTag, deleteTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title == "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.id === selectedTag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <section className="w-full flex flex-col gap-2">
      <nav className="w-full flex items-center justify-between">
        <p className="text-3xl font-bold">Memo</p>
        <div className="flex gap-3 items-center">
          <Link to={"/new"}>
            <FaPlus className="text-4xl border-2 rounded-full p-[5px] text-white bg-green-500 shadow-md" />
          </Link>

          <FiEdit
            onClick={() => setShowModal(true)}
            className="text-4xl border-2 rounded-full p-[5px] text-white bg-sky-600 shadow-md"
          />
        </div>
      </nav>
      <div className="flex justify-between mobile:flex-col mobile:gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            className="border-2 border-slate-500 p-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tags">Tags</label>
          <ReactSelect
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
            className="w-[200px] mobile:w-full"
          />
        </div>
      </div>
      <div className="w-full flex mobile:flex-col gap-3 mobile:items-start">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>
      <TagUpdateModal
        show={showModal}
        setShow={setShowModal}
        availableTags={availableTags}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </section>
  );
}

export default Home;
