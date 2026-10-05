import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { fixWordLists } from "../utils/fixWordLists";

/**
 * Rich text editor used for the blog content field.
 *
 * value — current HTML (controlled by the parent form state)
 * onChange(html) — called on every edit with the new HTML
 */
function RichEditor({ value = "", onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      // TipTap v3: StarterKit bundles the Link extension, so it is configured here
      // (no separate @tiptap/extension-link dependency needed).
      StarterKit.configure({
        link: {
          autolink: true, // bare URLs typed in the text become links
          linkOnPaste: true, // pasted URLs become links
          openOnClick: false, // do not follow links while editing
          defaultProtocol: "https",
          HTMLAttributes: {
            target: "_blank",
            rel: "noopener noreferrer",
            class: "blog-link",
          },
        },
      }),
    ],
    content: value,
    // Word/Google Docs paste is transformed before it reaches the editor, so the
    // fake MsoListParagraph bullets become a real bullet list.
    editorProps: {
      attributes: { class: "blog-content" },
      transformPastedHTML: fixWordLists,
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  // Keep the editor in sync when the form loads an existing post, or when
  // setFormData resets the form after a save.
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-ink/15 focus-within:ring-2 focus-within:ring-forest-800/40">
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
}

export default RichEditor;
