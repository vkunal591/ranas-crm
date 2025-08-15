"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/context/AuthContext";
import Wrapper from "@/components/common/Wrapper";
import { getAccessPoints } from "@/hooks/general";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Order ID" },
  { key: "userName", label: "User", sortable: true },
  { key: "totalAmount", label: "Total Amount", sortable: true },
  {
    key: "mobileNo",
    label: "Mobile No",
  },
  { key: "status", label: "Status", sortable: true, isBadge: true },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
  // {
  //   key: "items",
  //   subKey: "product.price",
  //   label: "Price",
  // },
  // {
  //   key: "items",
  //   subKey: "quantity",
  //   label: "Quantity",
  // },
  { key: "streetAddress", label: "Street Address" },
  { key: "city", label: "City" },
  { key: "landMark", label: "Landmark" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
  { key: "pincode", label: "Pincode" },
];

const filterOptions = [{ label: "Status", value: "status" }];

const Banners: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Order"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;
  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Orders");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Order"
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Banners;
