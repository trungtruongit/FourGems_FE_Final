import {useEffect, useState} from "react";
import {
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    styled,
    Box,
    alpha,
} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {Formik} from "formik";
import DropZone from "components/DropZone";
import {FlexBox} from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import BazaarSwitch from "../../../components/BazaarSwitch";
import {StyledTableCell} from "../StyledComponents";
import {token} from "stylis"; // styled components

const UploadImageBox = styled(Box)(({theme}) => ({
    width: 70,
    height: 70,
    display: "flex",
    overflow: "hidden",
    borderRadius: "8px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: alpha(theme.palette.info.light, 0.1),
}));
const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 14,
    cursor: "pointer",
    position: "absolute",
})); // ================================================================

// ================================================================
const ProductForm = (props) => {

    const {initialValues, validationSchema, handleFormSubmit, setProductPublish, productPublish} = props;
    const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

    const handleChangeDropZone = (files) => {
        files.forEach((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFiles(files);
    }; // HANDLE DELETE UPLOAD IMAGE

    const handleFileDelete = (file) => () => {
        setFiles((files) => files.filter((item) => item.name !== file.name));
    };


    return (
        <Card
            sx={{
                p: 6,
            }}
        >
            <Formik

                onSubmit={(values) => handleFormSubmit(values)}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Name of Product"
                                    color="info"
                                    size="medium"
                                    placeholder="Name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="barcode"
                                    label="Barcode"
                                    color="info"
                                    size="medium"
                                    placeholder="Barcode"
                                    value={values.barcode}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.barcode && !!errors.barcode}
                                    helperText={touched.barcode && errors.barcode}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="collection"
                                    label="Collection"
                                    color="info"
                                    size="medium"
                                    placeholder="Collection"
                                    value={values.collection}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.collection && !!errors.collection}
                                    helperText={touched.collection && errors.collection}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <DropZone onChange={(files) => handleChangeDropZone(files)}/>

                                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                                    {files.map((file, index) => (
                                        <UploadImageBox key={index}>
                                            <BazaarImage src={file.preview} width="100%"/>
                                            <StyledClear onClick={() => handleFileDelete(file)}/>

                                        </UploadImageBox>
                                    ))}
                                </FlexBox>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    rows={6}
                                    multiline
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="description"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    value={values.description}
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="quantity"
                                    color="info"
                                    size="medium"
                                    label="Quantity"
                                    placeholder="Quantity"
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                    onChange={handleChange}
                                    error={!!touched.quantity && !!errors.quantity}
                                    helperText={touched.quantity && errors.quantity}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="weight"
                                    color="info"
                                    size="medium"
                                    type="number"
                                    onBlur={handleBlur}
                                    value={values.weight}
                                    label="Weight"
                                    onChange={handleChange}
                                    placeholder="Weight"
                                    error={!!touched.weight && !!errors.weight}
                                    helperText={touched.weight && errors.weight}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="labor_price"
                                    color="info"
                                    size="medium"
                                    type="number"
                                    onBlur={handleBlur}
                                    value={values.labor_price}
                                    label="Labor Cost"
                                    onChange={handleChange}
                                    placeholder="Labor Cost"
                                    error={!!touched.labor_price && !!errors.labor_price}
                                    helperText={touched.labor_price && errors.labor_price}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    type="number"
                                    name="ratio_price"
                                    label="Ratio of Price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Ratio of Price"
                                    value={values.ratio_price}
                                    error={!!touched.ratio_price && !!errors.ratio_price}
                                    helperText={touched.ratio_price && errors.ratio_price}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    type="number"
                                    name="stone_price"
                                    label="Stone Price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Stone Price"
                                    value={values.stone_price}
                                    error={!!touched.stone_price && !!errors.stone_price}
                                    helperText={touched.stone_price && errors.stone_price}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="gold_type"
                                    onBlur={handleBlur}
                                    placeholder="Type of Gold"
                                    onChange={handleChange}
                                    value={values.gold_type}
                                    label="Type of Gold"
                                    error={!!touched.gold_type && !!errors.gold_type}
                                    helperText={touched.gold_type && errors.gold_type}
                                >
                                    <MenuItem value="gold_10k">Gold 10K</MenuItem>
                                    <MenuItem value="gold_14k">Gold 14K</MenuItem>
                                    <MenuItem value="gold_16k">Gold 16K</MenuItem>
                                    <MenuItem value="gold_18k">Gold 18K</MenuItem>
                                    <MenuItem value="gold_20k">Gold 20K</MenuItem>
                                    <MenuItem value="gold_21k">Gold 21K</MenuItem>
                                    <MenuItem value="gold_22k">Gold 22K</MenuItem>
                                    <MenuItem value="gold_24k">Gold 24K</MenuItem>
                                </TextField>
                            </Grid>
                            <StyledTableCell item sm={6} xs={12} align="left" sx={{ml: 1, mt: 3, fontWeight: 400}}>
                                Is Gem
                                <BazaarSwitch
                                    color="info"
                                    checked={productPublish}
                                    onChange={() => setProductPublish((state) => !state)}
                                />
                            </StyledTableCell>

                            <Grid item sm={6} xs={12} sx={{ml: "415px"}}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="product_type"
                                    onBlur={handleBlur}
                                    placeholder="Type of Product"
                                    onChange={handleChange}
                                    value={values.product_type}
                                    label="Type of Product"
                                    error={!!touched.product_type && !!errors.product_type}
                                    helperText={touched.product_type && errors.product_type}
                                >
                                    <MenuItem value="bracelet">Bracelet</MenuItem>
                                    <MenuItem value="earring">Earring</MenuItem>
                                    <MenuItem value="ring">Ring</MenuItem>
                                    <MenuItem value="necklace">Necklace</MenuItem>
                                    <MenuItem value="charm">Charm</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <Button variant="contained" color="info" type="submit">
                                    Save product
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Card>
    );
};

export default ProductForm;