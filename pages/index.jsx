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
import {useRouter} from "next/router"; // =======================================================
import { H1 } from "components/Typography";
import {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
// =======================================================
const Market = (props) => {
  const theme = useTheme();
  const router = useRouter();

  const [initialRedirectDone, setInitialRedirectDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (!token) {
        // No token found, redirect to login page
        router.push('/login');
        return; // Exit early
      }

      try {
        // Attempt to decode the token
        const decoded = jwtDecode(token);

        if (decoded.role === 'staff') {
          // Redirect to home page for staff
          router.push('/');
        } else {
          router.push('/');
          // Redirect to vendor dashboard only once
          // if (!initialRedirectDone) {
          //   setInitialRedirectDone(true);
          //   console.log(initialRedirectDone)
          //   router.push('/vendor/dashboard');
          //
          // } else {
          //   // Subsequent redirections go to '/'
          //   router.push('/');
          // }
        }
      } catch (error) {
        // Invalid token format, handle appropriately (e.g., log error, redirect to login)
        console.error('Invalid token:', error);
        router.push('/login');
      }
    }
  }, []);
  return (

      <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
        <SEO title="FourGems" />
        <Box bgcolor="#FFFFFF">
          {/* HERO SLIDER AND GRID */}
          <Section1 carouselData={props.mainCarouselData} />

          {/* SERVICE CARDS */}
          <Section2 serviceList={props.serviceList} />

          {/* CATEGORIES AND ANIMATED OFFER BANNER */}
          <Section3 categories={props.categories} />

          {/* DEALS OF THE DAY AND OFFER BANNERS */}
          <Section4 products={props.products} />

          {/* TOP OFFER BANNERS */}
          {/*<Offers />*/}

          {/* PRODUCT ROW WITH ELECTRONICS CATEGORY LIST */}
          <Section5 products={props.products} />

          {/*/!* OFFER BANNER *!/*/}
          <Section6 products={props.products}/>

          {/*/!* PRODUCT ROW WITH MEN'S FASHION CATEFORY LIST *!/*/}
          {/*<Section5 data={props.menFashionProducts} />*/}

          {/*/!* OFFER BANNER *!/*/}
          <Section7 products={props.products}/>

          {/*/!* PRODUCT ROW WITH WOMEN'S FASHION CATEFORY LIST *!/*/}
          {/*<Section5 data={props.womenFashionProducts} />*/}

          {/*/!*  FEATURED BRANDS *!/*/}
          <Section8 products={props.products} />

          {/* SELECTED PRODUCTS */}
          <Section9 products={props.products}/>
          <div style={{
            display: "grid",
            textAlign: "center",
            paddingBottom: "1.5rem",
          }}>
            <H1> Four Gems Jewelry </H1>
          </div>
        </Box>
        {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
        <Setting/>
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