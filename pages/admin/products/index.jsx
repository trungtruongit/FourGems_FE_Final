import {Button, Box, Card, Stack, Table, TableContainer} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import {H3} from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import {ProductRow} from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import {useRouter} from 'next/router';
import axios from "axios";
import {token} from "stylis";

// TABLE HEADING DATA LIST
const tableHeading = [
    {
        id: "name",
        label: "Name",
        align: "left",
    },
    {
        id: "category",
        label: "Category",
        align: "left",
    },
    {
        id: "price",
        label: "Price",
        align: "left",
    },
    {
        id: "description",
        label: "Description",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
]; // =============================================================================

ProductList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function ProductList(props) {
    const {products} = props; // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
    const router = useRouter()
    const hadleNav = () => {
        router.push('/admin/products/create')
    }
    const filteredProducts = products.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        description: item.description,
        price: item.price,
        image: item.image,
        published: item.published,
        categoryName: item.categoryName,
    }));
    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({
        listData: filteredProducts,
    });
    return (
        <Box py={4}>
            <H3>Product List</H3>


            <SearchArea
                handleSearch={() => {
                }}
                buttonText="Add Product"
                handleBtnClick={hadleNav}
                searchPlaceholder="Search Product..."
            />
            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer
                        sx={{
                            minWidth: 900,
                        }}
                    >
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={products.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((product, index) => (
                                    <ProductRow product={product} key={index}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(products.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    );
}
export const getStaticProps = async () => {
    let token = '';
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('token');
    } else if (typeof sessionStorage !== 'undefined') {
        // Fallback to sessionStorage if localStorage is not supported
        token = localStorage.getItem('token');
    } else {
        // If neither localStorage nor sessionStorage is supported
        console.log('Web Storage is not supported in this environment.');
    }
    const products = await axios.get("https://four-gems-api-c21adc436e90.herokuapp.com/product/show-all-product-from-warehouse?pageSize=1000&page=0&sortKeyword=productId&sortType=DESC&categoryName= &searchKeyword= ", {
        headers: {
            Authorization: 'Bearer ' + token
        },
    });
    return {
        props: {
            products,
        },
    };
};
