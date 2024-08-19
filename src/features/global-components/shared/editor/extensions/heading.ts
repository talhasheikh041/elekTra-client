import Heading, { HeadingOptions } from "@tiptap/extension-heading"

const CustomHeading = Heading.extend({
   addOptions(): HeadingOptions {
      return {
         ...this.parent?.(),
         levels: [1, 2, 3, 4, 5, 6], // Specify the heading levels you want to support
         HTMLAttributes: {},
      }
   },

   renderHTML({ node, HTMLAttributes }) {
      const level: number = this.options.levels.includes(node.attrs.level)
         ? node.attrs.level
         : this.options.levels[0]

      const classes = {
         1: "text-4xl font-bold",
         2: "text-3xl font-semibold",
         3: "text-2xl font-medium",
         4: "text-xl font-regular",
         5: "text-lg font-light",
         6: "text-base font-thin",
      }

      return [
         `h${level}`,
         {
            class: classes[level as keyof typeof classes] || "",
            ...this.options.HTMLAttributes,
            ...HTMLAttributes,
         },
         0,
      ]
   },
})

export default CustomHeading
