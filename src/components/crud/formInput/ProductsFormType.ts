import { FormField } from "@/hooks/types";

export const ProductsFormType: FormField[] = [
  {
    name: "category",
    type: "select",
    required: true,
    label: "Category",
    placeholder: "Select category",
  },
  {
    name: "name",
    type: "text",
    required: true,
    label: "Product Name",
    placeholder: "Enter product name",
  },
  {
    name: "stock",
    type: "number",
    required: true,
    label: "Stock",
    placeholder: "Enter Stock",
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    placeholder: "Enter price",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter product description",
    widthFull: true,
  },
  {
    name: "images",
    type: "file",
    label: "Image",
    widthFull: true,
  },
];
