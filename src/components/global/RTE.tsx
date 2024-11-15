import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

type RTEProps = {
  name?: string;
  label?: string;
  defaultValue: string;
  onChange: (content: string) => void; // Change the type to string to receive content directly
};

export default function RTE({
  name = "",
  label = "",
  defaultValue = "",
  onChange = (content: string) => {},
}: RTEProps) {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultValue); // Initialize with defaultValue

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent); // Pass the content directly to onChange
  };

  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      <JoditEditor
        ref={editor}
        config={{
          height: 500,
        }}
        value={content} // Bind the content state
        onBlur={(newContent) => handleEditorChange(newContent)} // Use the handler function
      />
    </div>
  );
}
