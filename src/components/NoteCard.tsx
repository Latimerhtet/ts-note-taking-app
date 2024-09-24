import { Link } from "react-router-dom";
import { Tag } from "../App";
import { IoIosPricetag } from "react-icons/io";
interface NoteCardProps {
  id: string;
  tags: Tag[];
  title: string;
}

function NoteCard({ id, tags, title }: NoteCardProps) {
  return (
    <Link
      to={`/${id}`}
      className="w-full flex flex-col gap-2 justify-start border-2 border-stone-200 p-2 rounded-md shadow-sm hover:translate-x-0 hover:shadow-custom hover:translate-y-[-5px] cursor-pointer duration-150 ease-in-out"
      key={id}
    >
      <p className="text-xl font-bold">{title}</p>
      <div className="flex gap-1 items-center">
        {tags.map((tag) => {
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
    </Link>
  );
}

export default NoteCard;
