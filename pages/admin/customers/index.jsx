import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchOrder from "components/dashboard/SearchOrder";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { SellerRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard"; // table column list

const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "shopName",
    label: "Phone",
    align: "left",
  },
  {
    id: "package",
    label: "MemberShip",
    align: "left",
  },
  {
    id: "balance",
    label: "TotalExpense",
    align: "left",
  },
  {
    id: "published",
    label: "Shop Published",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

SellerList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function SellerList({ sellers }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: sellers,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Customers</H3>

      <SearchOrder
        handleSearch={() => {}}
        buttonText="Add New Seller"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Customers..."
      />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 1100,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={sellers.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((seller, index) => (
                  <SellerRow seller={seller} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(sellers.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const sellers = await api.sellers();
  return {
    props: {
      sellers,
    },
  };
};
