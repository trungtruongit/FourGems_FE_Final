import {Box, Card, Stack, Table, TableContainer} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {H3} from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import {CustomerRow} from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import axios from "axios";

const tableHeading = [
    {
        id: "name",
        label: "Name",
        align: "left",
    },
    {
        id: "phone",
        label: "Phone",
        align: "left",
    },
    {
        id: "email",
        label: "Email",
        align: "left",
    },
    {
        id: "balance",
        label: "Wallet Balance",
        align: "left",
    },
    {
        id: "orders",
        label: "No Of Orders",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
];

CustomerList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function CustomerList({initialCustomers}) {
    const [customers, setCustomers] = useState(initialCustomers);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // useRouter should be called inside the component
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
    const handleNav = () => {
        router.push('/admin/users/create');
    };
    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({
        listData: customers,
    });
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://four-gems-api-c21adc436e90.herokuapp.com/user/get-all`, {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });

                console.log(response);

            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Box py={4}>
            <H3 mb={2}>Users</H3>

            <SearchArea
                handleSearch={() => {
                }}
                buttonText="Add User"
                handleBtnClick={handleNav} // use handleNav function
                searchPlaceholder="Search User..."
            />

            <Card>
                <Scrollbar>
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
                                numSelected={selected.length}
                                rowCount={filteredList.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((customer) => (
                                    <CustomerRow customer={customer} key={customer.id}/>
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
    const customers = await api.customers();
    return {
        props: {
            initialCustomers: customers,
        },
    };
};
