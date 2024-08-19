import { Image, ImageOptions } from "@tiptap/extension-image"
import axios from "axios"

interface CustomImageOptions extends ImageOptions {
   onDeleteImage: (loading: boolean) => void
}

const CustomImage = Image.extend<CustomImageOptions>({
   addKeyboardShortcuts() {
      return {
         Backspace: () => {
            const { state, dispatch } = this.editor.view
            const { selection } = state
            const { empty, from } = selection

            if (empty) {
               return false
            }

            const node = state.doc.nodeAt(from)

            if (node && node.type.name === "image") {
               // Extract the public ID from the image URL
               const urlParts = node.attrs.src.split("/")
               const publicIdWithExtension = urlParts[urlParts.length - 1]
               const publicId = publicIdWithExtension.split(".")[0] // Remove the file extension

               this.options.onDeleteImage(true)
               // Make a server request to delete the image
               axios
                  .delete(`${import.meta.env.VITE_SERVER_LINK}/api/v1/product/detailphoto`, {
                     data: { publicId: publicId },
                  })
                  .then((response) => {
                     if (response.data.success === true) {
                        // Delete the image from the editor
                        dispatch(state.tr.delete(from, from + node.nodeSize))
                     } else {
                        console.error("Failed to delete image from server")
                     }
                  })
                  .catch((error) => {
                     console.error("Error deleting image:", error)
                  })
                  .finally(() => {
                     // Notify that loading has ended
                     this.options.onDeleteImage(false)
                  })

               return true
            }

            return false
         },
      }
   },
})

export default CustomImage
