import { Box, useTheme } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Offers from "pages-sections/market-2/Offers";
import Section1 from "pages-sections/market-2/Section1";
import Section2 from "pages-sections/market-2/Section2";
import Section3 from "pages-sections/market-2/Section3";
import Section4 from "pages-sections/market-2/Section4";
import Section5 from "pages-sections/market-2/Section5";
import Section6 from "pages-sections/market-2/Section6";
import Section7 from "pages-sections/market-2/Section7";
import Section8 from "pages-sections/market-2/Section8";
import Section9 from "pages-sections/market-2/Section9";
import ShopLayout1 from "components/layouts/ShopLayout1";
import api from "utils/__api__/market-2";
import { useRouter } from "next/router"; // =======================================================
import { H1 } from "components/Typography";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Api } from "@mui/icons-material";
import axios from "axios";

// =======================================================
const Market = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const [showBraceletProduct, setShowBraceletProduct] = useState([]);
  const [showRingProduct, setShowRingProduct] = useState([]);
  const [showEarringProduct, setShowEarringProduct] = useState([]);
  const [showNecklaceProduct, setShowNecklaceProduct] = useState([]);
  const [showCharmProduct, setShowCharmProduct] = useState([]);

  useEffect(() => {
    const fetchProductBracelet = async () => {
      const token = localStorage.getItem("token");
      try {
        const resBraceletProduct = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=1&pageSize=100&page=0&sortKeyword=productId&sortType=ASC&categoryName=bracelet&searchKeyword= `,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        setShowBraceletProduct(resBraceletProduct.data.data);
        console.log(resBraceletProduct.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductBracelet();
  }, []);

  useEffect(() => {
    const fetchProductRing = async () => {
      const token = localStorage.getItem("token");
      try {
        const resRingProduct = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=1&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=ring&searchKeyword= `,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        setShowRingProduct(resRingProduct.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductRing();
  }, []);

  useEffect(() => {
    const fetchProductEarring = async () => {
      const token = localStorage.getItem("token");
      try {
        const resEarringProduct = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=1&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=earring&searchKeyword= `,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        setShowEarringProduct(resEarringProduct.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductEarring();
  }, []);

  useEffect(() => {
    const fetchProductNecklaces = async () => {
      const token = localStorage.getItem("token");
      try {
        const resNecklacesProduct = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=1&pageSize=100&page=0&sortKeyword=price&sortType= &categoryName=necklace&searchKeyword= `,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        setShowNecklaceProduct(resNecklacesProduct.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductNecklaces();
  }, []);

  useEffect(() => {
    const fetchProductCharm = async () => {
      const token = localStorage.getItem("token");
      try {
        const resCharmProduct = await axios.get(
          `https://four-gems-api-c21adc436e90.herokuapp.com/product/show-product?countId=1&pageSize=100&page=0&sortKeyword=productId&sortType=ASC&categoryName=charm&searchKeyword= `,
          {
            headers: {
              Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
          }
        );
        setShowCharmProduct(resCharmProduct.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductCharm();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      // const dataShow = Api.getProduct(token)
      if (!token) {
        // No token found, redirect to login page
        router.push("/login");
        return; // Exit early
      }

      // Attempt to decode the token
      const decoded = jwtDecode(token);

      if (decoded.role === "staff") {
        // Redirect to home page for staff
        router.push("/");
      } else {
        router.push("/vendor/dashboard");
      }
    }
  }, []);

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="FourGemsShop" />
      <Box bgcolor="#FFFFFF">
        {/* HERO SLIDER AND GRID */}
        <Section1 carouselData={props.mainCarouselData} />

        {/* SERVICE CARDS */}
        <Section2 serviceList={props.serviceList} />

        {/* CATEGORIES AND ANIMATED OFFER BANNER */}
        <Section3 categories={props.categories} />

        {/* Necklaces */}
        <Section5 products={showNecklaceProduct} />

        {/*/!* Rings*!/*/}
        <Section6 products={showRingProduct} />

        {/*/!* Earrings *!/*/}
        <Section7 products={showEarringProduct} />

        {/*  Charm */}
        <Section8 products={showCharmProduct} />

        {/* Bracelet */}
        <Section9 products={showBraceletProduct} />

        <div
          style={{
            display: "grid",
            textAlign: "center",
            paddingBottom: "1.5rem",
          }}
        >
          <H1> Four Gems Jewelry </H1>
        </div>
      </Box>
      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </ShopLayout1>
  );
};

export const getStaticProps = async () => {
  const brands = await api.getBrands();
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const categories = await api.getCategories();
  const mainCarouselData = await api.getMainCarouselData();
  const menFashionProducts = await api.getMenFashionProducts();
  const electronicsProducts = await api.getElectronicsProducts();
  const womenFashionProducts = await api.getWomenFashionProducts();
  return {
    props: {
      brands,
      products,
      categories,
      serviceList,
      mainCarouselData,
      menFashionProducts,
      electronicsProducts,
      womenFashionProducts,
    },
  };
};
export default Market;
