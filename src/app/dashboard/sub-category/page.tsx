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
  { "key": "_id", "label": "Order ID" },
  { "key": "user", "label": "User", sortable: true },
  { "key": "totalAmount", "label": "Total Amount", sortable: true },
  { "key": "status", "label": "Status", sortable: true,isBadge:true },
  { "key": "createdAt", "label": "Date", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "User", value: "user" },
  { label: "Status", value: "isActive" },
];

const Banners: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Subcategory"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Subcategory");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Subcategory"
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
