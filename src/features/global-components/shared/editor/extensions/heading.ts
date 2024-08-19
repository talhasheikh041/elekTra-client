import Heading, { HeadingOptions } from "@tiptap/extension-heading"

const CustomHeading = Heading.extend({
   addOptions(): HeadingOptions {
      return {
         ...this.parent?.(),
         levels: [1, 2, 3, 4], // Specify the heading levels you want to support
         HTMLAttributes: {},
      }
   },

   renderHTML({ node, HTMLAttributes }) {
      const level: number = this.options.levels.includes(node.attrs.level)
         ? node.attrs.level
         : this.options.levels[0]

      const classes = {
         1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
         2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
         3: "scroll-m-20 text-2xl font-semibold tracking-tight",
         4: "scroll-m-20 text-xl font-semibold tracking-tight",
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
