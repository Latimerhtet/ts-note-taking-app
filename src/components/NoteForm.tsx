import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
interface NoteDataProps extends Partial<NoteData> {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  description = "",
  tags = [],
}: NoteDataProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      titleRef.current?.value === undefined &&
      descriptionRef.current?.value === undefined
    ) {
      return;
    } else {
      onSubmit({
        title: titleRef.current!.value,
        description: descriptionRef.current!.value,
        tags: selectedTags,
      });
    }
    navigate("..");
  };
  return (
    <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
      <div className="flex justify-between mobile:flex-col mobile:gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            defaultValue={title}
            required
            type="text"
            ref={titleRef}
            className="border-2 border-slate-500 p-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tags">Tags</label>
          <CreateReactSelect
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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
      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="mb-1">
          Body
        </label>
        <textarea
          defaultValue={description}
          required
          className="border-[1px] border-slate-400 shadow-sm rounded-sm"
          rows={15}
          ref={descriptionRef}
        />
      </div>
      <div className="w-full flex justify-end gap-2 items-center">
        <button type="submit" className="p-2 bg-gray-500 text-white rounded-lg">
          Add Note
        </button>
        <Link
          to={".."}
          className="p-[7px] border-2 border-fuchsia-400 text-fuchsia-400 rounded-lg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
