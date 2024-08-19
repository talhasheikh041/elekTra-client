import { forwardRef, useImperativeHandle, useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import MenuBar from "@/features/global-components/shared/editor/Menu-Bar"
import DOMPurify from "dompurify"
import { TiptapEditorRef } from "@/pages/admin/management/New-Product"

// Extensions
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import BulletList from "@tiptap/extension-bullet-list"
import ListItem from "@tiptap/extension-list-item"
import CustomHeading from "@/features/global-components/shared/editor/extensions/heading"
import CustomImage from "@/features/global-components/shared/editor/extensions/image"

type TiptapProps = {
   description: string
   onChange: (richText: string) => void
}

const Tiptap = forwardRef<TiptapEditorRef, TiptapProps>(({ description, onChange }, ref) => {
   const [deleteImageLoading, setDeleteImageLoading] = useState(false)

   const editor = useEditor({
      extensions: [
         StarterKit.configure({
            hardBreak: {
               keepMarks: false,
            },
            heading: false,
            paragraph: {
               HTMLAttributes: {
                  class: "leading-7 [&:not(:first-child)]:mt-6",
               },
            },
            blockquote: {
               HTMLAttributes: {
                  class: "mt-6 border-l-2 pl-6 italic",
               },
            },
            code: {
               HTMLAttributes: {
                  class: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
               },
            },
         }),
         TextAlign.configure({
            types: ["heading", "paragraph"],
         }),
         Highlight,
         CustomHeading,
         CustomImage.configure({
            onDeleteImage: (loading: boolean) => setDeleteImageLoading(loading),
         }),
         BulletList.configure({
            HTMLAttributes: {
               class: "my-6 ml-6 list-disc [&>li]:mt-2",
            },
         }),
         ListItem,
      ],
      content: description,
      editorProps: {
         attributes: {
            class: "min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
         },
      },

      onUpdate: ({ editor }) => {
         const cleanHtml = DOMPurify.sanitize(editor.getHTML())
         onChange(cleanHtml)
         console.log(cleanHtml)
      },
   })

   useImperativeHandle(ref, () => ({
      clearEditor: () => {
         console.log("clearing editor")
         editor?.commands.clearContent() // Clear the editor content
      },
   }))

   return (
      <>
         <MenuBar editor={editor} deleteImageLoading={deleteImageLoading} />
         <EditorContent editor={editor} />
      </>
   )
})

export default Tiptap
