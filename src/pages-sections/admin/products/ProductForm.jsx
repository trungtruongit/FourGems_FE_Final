import { useState } from "react";
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
import { Clear } from "@mui/icons-material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import BazaarSwitch from "../../../components/BazaarSwitch";
import {StyledTableCell} from "../StyledComponents"; // styled components

const UploadImageBox = styled(Box)(({ theme }) => ({
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
  const { initialValues, validationSchema, handleFormSubmit } = props;
  const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const [productPulish, setProductPublish] = useState();
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
        onSubmit={handleFormSubmit}
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

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
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
                  name="stock"
                  color="info"
                  size="medium"
                  label="Stock"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={touched.stock && errors.stock}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    name="price"
                    color="info"
                    size="medium"
                    type="number"
                    onBlur={handleBlur}
                    value={values.price}
                    label="Weight"
                    onChange={handleChange}
                    placeholder="Weight"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Labor Cost"
                  onChange={handleChange}
                  placeholder="Labor Cost"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="sale_price"
                  label="Ratio of Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Ratio of Price"
                  value={values.sale_price}
                  error={!!touched.sale_price && !!errors.sale_price}
                  helperText={touched.sale_price && errors.sale_price}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    color="info"
                    size="medium"
                    type="number"
                    name="sale_price"
                    label="Stone Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Stone Price"
                    value={values.sale_price}
                    error={!!touched.sale_price && !!errors.sale_price}
                    helperText={touched.sale_price && errors.sale_price}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="category"
                    onBlur={handleBlur}
                    placeholder="Category"
                    onChange={handleChange}
                    value={values.category}
                    label="GoldId"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                >
                  <MenuItem value="electronics">Gold 10K</MenuItem>
                  <MenuItem value="electronics">Gold 14K</MenuItem>
                  <MenuItem value="electronics">Gold 16K</MenuItem>
                  <MenuItem value="electronics">Gold 18K</MenuItem>
                  <MenuItem value="electronics">Gold 20K</MenuItem>
                  <MenuItem value="electronics">Gold 21K</MenuItem>
                  <MenuItem value="electronics">Gold 22K</MenuItem>
                  <MenuItem value="electronics">Gold 24K</MenuItem>

                </TextField>
              </Grid>
              <StyledTableCell item sm={6} xs={12} align="left" sx={{
                ml: 1,
                mt: 3,
                fontWeight: 400,
              }}>
                Is Gem
                <BazaarSwitch
                    color="info"
                    checked={productPulish}
                    onChange={() => setProductPublish((state) => !state)}
                />
              </StyledTableCell>
              <Grid item sm={6} xs={12} sx={{
                ml: "382px"
              }}>
                <TextField
                    select
                    fullWidth
                    color="info"
                    size="medium"
                    name="category"
                    onBlur={handleBlur}
                    placeholder="Category"
                    onChange={handleChange}
                    value={values.category}
                    label="TypeId"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                >
                  <MenuItem value="electronics">Bracelet</MenuItem>
                  <MenuItem value="electronics">Earring</MenuItem>
                  <MenuItem value="electronics">Ring</MenuItem>
                  <MenuItem value="electronics">Necklace</MenuItem>
                  <MenuItem value="electronics">Charm</MenuItem>
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
