"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Put } from "@/hooks/apiUtils";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";

interface SubcategoryFormProps {
  onClose?: any;
  formType: any;
  data?: SubcategoryState;
  setFilteredData?: any;
}

interface SubcategoryState {
  _id: string;
  category: string;
  name: string;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = (props) => {
  const [category, setCategory] = useState<any>();
  const data = props.data;
  const [form, setForm] = useState({
    _id: data?._id ?? "",
    category: data?.category ?? "",
    name: data?.name ?? "",

  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getCategory = async () => {
    // e.preventDefault();
    try {
      const currentEndpoint = endpoints['Category'];
      const url = currentEndpoint.fetchAll;

      const resp: any = await Fetch(`${url}`, undefined, 5000, true, false);

      if (resp.success) {
        setCategory(resp?.data?.result);
      } else return toast.error("Failed category load");
    } catch (error: any) {
      console.log("Failed to category load", error);
    } finally {
      props.onClose();
    }
  };
  useEffect(() => {
    getCategory();
  }, []); // Ensure getCategory is included if it's defined outside useEffect


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const currentEndpoint = endpoints[props.formType];
      const url = currentEndpoint.update;

      const resp: any = await Put(`${url}${form?._id}`, form, 5000);

      if (resp.success) {
        const response: any = await Fetch(currentEndpoint.fetchAll);
        if (response?.success) props.setFilteredData(response?.data?.result);
        else window.location.reload(); // TODO: this should be done in future
      } else return toast.error("Failed to update blog");
    } catch (error: any) {
      console.log("Failed to update blog", error);
    } finally {
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="mb-2 font-semibold text-gray-700"
          >
            Category Name
          </label>
          {form?.name}
          <input type="text" id="name" required value={form?.name} onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
      </div>

      <div className="flex mt-2 flex-col">
        <label htmlFor="category" className="mb-2 font-semibold text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          value={form.category}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none"
        >
          <option value="">Select Category</option>
          {
            category && category?.map((data: any, index: any) => (
              <option key={index} value={data?._id}>{data?.name}</option>
            ))
          }

        </select>
      </div>
      <div className="flex justify-start mt-3 items-center space-x-2">
        <button
          type="submit"
          className="md:col-span-2 mt-2 py-1 bg-primary hover:bg-primary/70 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          {form._id ? "Update" : "Save"}
          <sup>+</sup>
        </button>
        <button
          type="button"
          onClick={props.onClose}
          className="md:col-span-2 mt-2 py-1 bg-red-600 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubcategoryForm;
