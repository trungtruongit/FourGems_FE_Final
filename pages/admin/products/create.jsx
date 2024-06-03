import {Box} from "@mui/material";
import * as yup from "yup";
import {H3} from "components/Typography";
import {ProductForm} from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import {useState} from "react"; // =============================================================================

CreateProduct.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function CreateProduct() {
  const INITIAL_VALUES = {
    userName: "",
    name: "",
    address: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: "",
    counterId: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.string().required("required"),
    description: yup.string().required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    tags: yup.object().required("required"),
  });

  const handleFormSubmit = (values) => {
    console.log(values)
    const productNew = {

    }
  };

    return (
        <Box py={4}>
            <H3 mb={2}>Add New Product</H3>

            <ProductForm
                setProductPublish={setProductPublish}
                productPublish = {productPublish}
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    );
}
