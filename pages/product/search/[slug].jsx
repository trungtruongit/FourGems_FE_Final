import { useCallback, useEffect, useState } from "react";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FlexBox } from "components/flex-box";
import Sidenav from "components/sidenav/Sidenav";
import { H5, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductCard1List from "components/products/ProductCard1List";
import ProductCard9List from "components/products/ProductCard9List";
import ProductFilterCard from "components/products/ProductFilterCard";
import productDatabase from "data/product-database";
import axios from "axios";

const ProductSearchResult = () => {
  const [view, setView] = useState("grid");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const [productList, setProductList] = useState([]);
  let token = "";
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
  } else if (typeof sessionStorage !== "undefined") {
    // Fallback to sessionStorage if localStorage is not supported
    token = localStorage.getItem("token");
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log("Web Storage is not supported in this environment.");
  }
  useEffect(() => {
    const fetchShowProduct = async () => {
      try {
        const resShowProduct = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=1&pageSize=9&page=0&sortKeyword=productId&sortType=DESC&categoryName=&searchKeyword=`,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        setProductList(resShowProduct.data.data);
        console.log(resShowProduct.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchShowProduct();
  }, []);
  return (
    <ShopLayout1>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* TOP BAR AREA */}
        <Card
          elevation={1}
          sx={{
            mb: "55px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            p: {
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
              xs: "1.25rem 1.25rem 0.25rem",
            },
          }}
        >
          <Box>
            <H5>Searching for “ mobile phone ”</H5>
            <Paragraph color="grey.600">48 results found</Paragraph>
          </Box>

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Short by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Short by"
                defaultValue={sortOptions[0].value}
                sx={{
                  flex: "1 1 0",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              {downMd && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard />
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid
            item
            md={3}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid item md={9} xs={12}>
            {view === "grid" ? (
              //đổ api lên
              <ProductCard1List products={productDatabase.slice(95, 104)} />
            ) : (
              <ProductCard9List products={productDatabase.slice(95, 104)} />
            )}
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};

const sortOptions = [
  {
    label: "Rating high to low",
    value: "Relevance",
  },
  {
    label: "Rating low to high",
    value: "Date",
  },
  {
    label: "A to Z",
    value: "Price Low to High",
  },
  {
    label: "Z to A",
    value: "Price High to Low",
  },
];
export default ProductSearchResult;
