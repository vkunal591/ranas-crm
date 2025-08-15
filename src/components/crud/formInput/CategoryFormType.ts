import { FormField } from "@/hooks/types";

export const CategoryFormType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    placeholder: "Enter name",
    widthFull: true
  },
  {
    name: "image",
    type: "file",
    required: true,
    label: "Image",
    widthFull: true,
  },

];
