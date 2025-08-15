import { FormField } from "@/hooks/types";

export const SubCategoryFormType: FormField[] = [
  {
    name: "category",
    type: "select",
    required: true,
    label: "Category",
    placeholder: "Select Category",
    widthFull: true
  },
  {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    placeholder: "Enter name",
    widthFull: true
  },
];
