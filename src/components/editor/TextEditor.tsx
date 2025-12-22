"use client";
import { Editor } from "@tinymce/tinymce-react";

interface EditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

export default function TextEditor({
  initialValue = "",
  onChange,
}: EditorProps) {
  const TinyMCEKey = process.env.NEXT_PUBLIC_TINYMCE_KEY;

  return (
    <div className="w-full">
      <Editor
        apiKey={TinyMCEKey}
        initialValue={initialValue}
        init={{
          branding: false,
          promotion: false,
          height: 500,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "code", "help", "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "table image | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={onChange}
      />
    </div>
  );
}