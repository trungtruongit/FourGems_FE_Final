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

import {useEffect, useState} from "react";

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
export default function ProductList({initialProducts}) {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNav = () => {
        router.push('/admin/products/create');
    };

    let token = '';
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('token');
    } else if (typeof sessionStorage !== 'undefined') {
        token = sessionStorage.getItem('token');
    } else {
        console.log('Web Storage is not supported in this environment.');
    }

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({
        listData: products,
    });

    useEffect(() => {
        const fetchData = async () => {
            console.log(token)
            setLoading(true);
            try {
                if (token) {
                    const response = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product`, {
                        headers: {
                            Authorization: `Bearer ` + token
                        }
                    });
                    setProducts(response.data.data);
                    console.log(response.data.data);
                } else {
                    console.warn("Token is missing. Please ensure it's properly set.");
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    return (
        <Box py={4}>
            <H3>Product List</H3>

            <SearchArea
                handleSearch={() => {}}
                buttonText="Add Product"
                handleBtnClick={handleNav}
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
                                rowCount={filteredList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((product) => (
                                    <ProductRow product={product} key={product.productId}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(filteredList.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    );
}

export const getStaticProps = async () => {
    try {
        const products = await api.customers();
        return {
            props: {
                initialProducts: products,
            },
        };
    } catch (error) {
        console.error("Failed to fetch initial products:", error);
        return {
            props: {
                initialProducts: [],
            },
        };
    }
};
