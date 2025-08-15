"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

interface OrderFormProps {
  onClose?: () => void;
  formType: string;
  data?: OrderState;
  setFilteredData?: (data: any) => void;
}

interface OrderState {
  _id?: string;
  userName: string;
  mobileNo: string;
  totalAmount: number;
  status: string;
  items: {
    quantity: number;
    product: {
      _id: string;
      name: string;
      description: string;
      price: number;
      images: string;
    };
  }[];
  streetAddress: string | null;
  city: string | null;
  landMark: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
}

const OrderForm: React.FC<OrderFormProps> = (props) => {
  console.log(props?.data);
  const data = props.data;
  const [form, ] = useState<OrderState>(
    data?._id
      ? {
          _id: data?._id ?? "",
          userName: data?.userName ?? "",
          mobileNo: data?.mobileNo ?? "",
          totalAmount: data?.totalAmount ?? 0,
          status: data?.status ?? "",
          items: data?.items ?? [],
          streetAddress: data?.streetAddress ?? "",
          city: data?.city ?? "",
          landMark: data?.landMark ?? "",
          state: data?.state ?? "",
          country: data?.country ?? "",
          pincode: data?.pincode ?? "",
        }
      : {
          userName: "",
          mobileNo: "",
          totalAmount: 0,
          status: "",
          items: [],
          streetAddress: "",
          city: "",
          landMark: "",
          state: "",
          country: "",
          pincode: "",
        }
  );

  // Handle form submission (optional, as fields are disabled)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Since fields are disabled, submission might not be needed
    // If required, you can add logic here similar to the original
    toast.info("Form is read-only. No changes can be submitted.");
    props.onClose?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* User Information */}
        <div className="flex flex-col col-span-3 p-3 mb-2">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col mb-2">
              <label htmlFor="userName" className="mb-1 font-medium">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={form.userName || ""}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="mobileNo" className="mb-1 font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                value={form.mobileNo || ""}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col mb-2">
              <label htmlFor="totalAmount" className="mb-1 font-medium">
                Total Amount
              </label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={form.totalAmount || 0}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="status" className="mb-1 font-medium">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={form.status || ""}
                disabled  
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="flex flex-col col-span-3 p-3 mb-2">
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          {form.items.length > 0 ? (
            form.items.map((item, index) => (
              <div
                key={index}
                className="border p-3 mb-3 rounded-lg bg-gray-50"
              >
                {/* <h4 className="font-medium mb-2">Item {index + 1}</h4> */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col mb-2">
                    <Image
                      width={900}
                      height={900}
                      src={
                        `${process.env.NEXT_PUBLIC_BASE_URL}${item.product.images}` ||
                        "/placeholder-image.jpg"
                      }
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    {/* <label className="mb-1 font-medium">Product Name</label> */}
                    <input
                      type="text"
                      value={item.product.name || ""}
                      disabled
                      className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    {/* <label className="mb-1 font-medium">Quantity</label> */}
                    <input
                      type="number"
                      value={item.quantity || 0}
                      disabled
                      className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    {/* <label className="mb-1 font-medium">Price</label> */}
                    <input
                      type="number"
                      value={item.product.price || 0}
                      disabled
                      className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  {/* <div className="flex flex-col mb-2">
                    <label className="mb-1 font-medium">Description</label>
                    <textarea
                      value={item.product.description || ""}
                      disabled
                      rows={2}
                      className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in this order.</p>
          )}
        </div>

        {/* Address Section */}
        <div className="flex flex-col col-span-3 p-3 mb-2">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col mb-2">
              <label htmlFor="streetAddress" className="mb-1 font-medium">
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={form.streetAddress || "Not provided"}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="city" className="mb-1 font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city || "Not provided"}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="landMark" className="mb-1 font-medium">
                Landmark
              </label>
              <input
                type="text"
                id="landMark"
                name="landMark"
                value={form.landMark || "Not provided"}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="state" className="mb-1 font-medium">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={form.state || "Not provided"}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="country" className="mb-1 font-medium">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={form.country || "Not provided"}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="pincode" className="mb-1 font-medium">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={form.pincode || "Not provided"}
                disabled
                className="p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-3 items-center space-x-2">
        <button
          type="button"
          onClick={props.onClose}
          className="mt-2 py-1 bg-red-600 text-white rounded-md text-lg px-3"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
