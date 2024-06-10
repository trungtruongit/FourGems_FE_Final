import {useState} from "react";
import {useRouter} from "next/router";
import {Delete, Edit, RemoveRedEye} from "@mui/icons-material";
import {Avatar, Box} from "@mui/material";
import {FlexBox} from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import {Paragraph, Small} from "components/Typography";
import {currency} from "lib";
import {
    StyledTableRow,
    CategoryWrapper,
    StyledTableCell,
    StyledIconButton,
} from "../StyledComponents";
import axios from "axios";
import {token} from "stylis"; // ========================================================================

// ========================================================================
const ProductRow = ({product}) => {
    const {productName, price, image, description, productId, categoryName, published} = product;
    const router = useRouter();
    const [productPulish, setProductPublish] = useState(published);
    const [update, setUpdate] = useState();
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
    const handleUpdateProduct = async () => {
        try {
            const respone = await axios.post(`https://four-gems-api-c21adc436e90.herokuapp.com/product/update-product`, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            });
            setUpdate(respone.data.data);
            console.log(respone.data.data);
            console.log("OK")
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    }
    const handleDeleteProduct = async (productId) => {
        console.log(productId)
        try {
            await axios.delete(`https://four-gems-api-c21adc436e90.herokuapp.com/product/delete-product?productId=${productId}`,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            window.location.reload();
        } catch (e) {
            console.log("Failed to delete product", e);
        }
    }
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">
                <FlexBox alignItems="center" gap={1.5}>
                    <Avatar
                        src={image}
                        sx={{
                            borderRadius: "8px",
                        }}
                    />
                    <Box>
                        <Paragraph>{productName}</Paragraph>
                        <Small color="grey.600">#{productId}</Small>
                    </Box>
                </FlexBox>
            </StyledTableCell>

            <StyledTableCell align="left">
                <CategoryWrapper>{categoryName}</CategoryWrapper>
            </StyledTableCell>



            <StyledTableCell align="left">{currency(price)}</StyledTableCell>

            <StyledTableCell align="left">
                {description}
            </StyledTableCell>

            <StyledTableCell align="left">

                <BazaarSwitch
                    color="info"
                    checked={productPulish}
                    onChange={() => setProductPublish((state) => !state)}
                />
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton onClick={() => handleUpdateProduct()}>
                    <Edit/>
                </StyledIconButton>




                <StyledIconButton onClick={() => handleDeleteProduct()}>
                    <Delete/>
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default ProductRow;
