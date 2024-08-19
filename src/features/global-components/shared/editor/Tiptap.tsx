import { useUploadImage } from "@/features/global-components/shared/editor/extensions/use-upload-image"
import { Button } from "@/features/global-components/ui/button"
import { Toggle } from "@/features/global-components/ui/toggle"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent, useEditor, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
   AlignCenter,
   AlignJustify,
   AlignLeft,
   AlignRight,
   Bold,
   Heading1,
   Heading2,
   Heading3,
   Highlighter,
   ImageIcon,
   Italic,
   Loader,
   Pilcrow,
   Strikethrough,
} from "lucide-react"
import { forwardRef, useCallback, useImperativeHandle, useState } from "react"

import CustomHeading from "@/features/global-components/shared/editor/extensions/heading"
import CustomImage from "@/features/global-components/shared/editor/extensions/image"
import DOMPurify from "dompurify"
import { TiptapEditorRef } from "@/pages/admin/management/New-Product"

type MenuBarProps = {
   editor: Editor | null
   deleteImageLoading: boolean
}

const MenuBar = ({ editor, deleteImageLoading }: MenuBarProps) => {
   if (!editor) {
      return null
   }
   const { uploadImage, isLoading } = useUploadImage()

   const addImage = useCallback(() => {
      const fileInput = document.createElement("input")
      fileInput.type = "file"
      fileInput.accept = "image/*"

      // Attach an event listener to handle file selection
      fileInput.onchange = async (event: Event) => {
         const target = event.target as HTMLInputElement
         const file = target.files?.[0]
         if (file) {
            const url = await uploadImage(file)
            if (url) editor.chain().focus().setImage({ src: url }).run()
         }
      }

      // Programmatically trigger the file input click
      fileInput.click()

      // Optionally, remove the file input element after the click
      fileInput.remove()
   }, [editor])

   return (
      <div className="control-group">
         <div className="rounded-sm border p-1">
            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
               pressed={editor.isActive("heading", { level: 1 })}
            >
               <Heading1 className="size-5" />
            </Toggle>
            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
               pressed={editor.isActive("heading", { level: 2 })}
            >
               <Heading2 className="size-5" />
            </Toggle>
            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
               pressed={editor.isActive("heading", { level: 3 })}
            >
               <Heading3 className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().setParagraph().run()}
               pressed={editor.isActive("paragraph")}
            >
               <Pilcrow className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleBold().run()}
               pressed={editor.isActive("bold")}
            >
               <Bold className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleItalic().run()}
               pressed={editor.isActive("italic")}
            >
               <Italic className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleStrike().run()}
               pressed={editor.isActive("strike")}
            >
               <Strikethrough className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
               pressed={editor.isActive("highlight")}
            >
               <Highlighter className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
               pressed={editor.isActive({ textAlign: "left" })}
            >
               <AlignLeft className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
               pressed={editor.isActive({ textAlign: "center" })}
            >
               <AlignCenter className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
               pressed={editor.isActive({ textAlign: "right" })}
            >
               <AlignRight className="size-5" />
            </Toggle>

            <Toggle
               size={"sm"}
               onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
               pressed={editor.isActive({ textAlign: "justify" })}
            >
               <AlignJustify className="size-5" />
            </Toggle>
            <Button variant={"ghost"} size={"icon"} type="button" onClick={addImage}>
               {isLoading || deleteImageLoading ? (
                  <Loader className="animate-spin" />
               ) : (
                  <ImageIcon className="size-5" />
               )}
            </Button>
         </div>
      </div>
   )
}

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
         }),
         TextAlign.configure({
            types: ["heading", "paragraph"],
         }),
         Highlight,
         CustomHeading,
         CustomImage.configure({
            onDeleteImage: (loading: boolean) => setDeleteImageLoading(loading),
         }),
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
         editor?.commands.clearContent(true) // Clear the editor content
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
