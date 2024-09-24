import { IoIosPricetag } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNote } from "./NoteLayout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
function Note() {
  const note = useNote();

  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold mb-2">{note.title}</p>
          {note.tags.length > 0 && (
            <div className="flex gap-1 items-center">
              {note.tags.map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="w-fit pt-0  pb-1  px-2 flex gap-1 items-center bg-indigo-500 text-white rounded-md "
                  >
                    <IoIosPricetag className="text-xs mt-1" />
                    <p className="mt-0" key={tag.id}>
                      {tag.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <Link to={`/${note.id}/edit`}>
            <FiEdit3 className="p-[5px] text-3xl rounded-full bg-cyan-600 text-white" />
          </Link>
          <RiDeleteBin6Line className="p-[5px] text-3xl rounded-full bg-red-500 text-white" />
          <Link to={".."}>
            <MdArrowBackIosNew className="p-[5px] text-3xl rounded-full bg-fuchsia-600 text-white" />
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <ReactMarkdown>{note.description}</ReactMarkdown>
      </div>
    </section>
  );
}

export default Note;
