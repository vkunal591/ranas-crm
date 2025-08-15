"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import { populateFormData, populateFormFields } from "@/hooks/general";
import { CategoryFormType } from "./formInput/CategoryFormType";

interface CategoryFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const CategoryForm: React.FC<CategoryFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const formField = data?._id
    ? populateFormFields(CategoryFormType, data)
    : CategoryFormType;

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(CategoryFormType, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;
      // Convert updatedData to FormData
      const formData = new FormData();
      for (const key in updatedData) {
        if (updatedData[key] instanceof File) {
          // If the field is a file, append it correctly
          formData.append(key, updatedData[key]);
        } else if (Array.isArray(updatedData[key])) {
          // If the field is an array, stringify it before appending
          formData.append(key, JSON.stringify(updatedData[key]));
        } else {
          formData.append(key, updatedData[key]);
        }
      }

      setSubmitting(true);
      const response: any = data?._id
        ? await Put(url, formData)
        : await Post(url, formData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
      return toast.error("Something went wrong!");
    } finally {
      props.onClose?.();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <DynamicForm
        returnAs="object"
        fields={formField}
        formData={formData}
        submitting={submitting}
        onClose={props?.onClose}
        setFormData={setFormData}
        makeApiCall={makeApiCall}
      />
    </div>
  );
};

export default CategoryForm;