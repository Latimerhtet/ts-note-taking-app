import { Tag } from "../App";
import { MdCancel } from "react-icons/md";
interface modalProps {
  show: boolean;
  setShow: (isShow: boolean) => void;
  availableTags: Tag[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}

function TagUpdateModal({
  show,
  setShow,
  availableTags,
  updateTag,
  deleteTag,
}: modalProps) {
  return (
    <div
      className={` w-full p-3 scale-0 transition-all duration-150 ${
        show && "scale-95"
      } flex flex-col gap-2 absolute left-0 bg-slate-100`}
    >
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Tags</p>
        <button
          className="p-1 bg-teal-600 text-white rounded-md"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
      </div>
      <div className="w-full flex flex-col gap-3">
        {availableTags.map((tag) => (
          <div className="w-full flex gap-1 items-center  ">
            <input
              className="w-full bg-slate-100 p-1"
              type="text"
              value={tag.label}
              key={tag.id}
              onChange={(e) => updateTag(tag.id, e.target.value)}
            />
            <MdCancel
              className="cursor-pointer "
              onClick={() => deleteTag(tag.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagUpdateModal;
