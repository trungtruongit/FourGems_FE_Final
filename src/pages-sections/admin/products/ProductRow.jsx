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
    const {productName, price, image, description, productId, categoryName} = product;
    const router = useRouter();
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
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`https://four-gems-api-c21adc436e90.herokuapp.com/product/delete-product?productId=${id}`,{
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

            <StyledTableCell align="center">
                <StyledIconButton onClick={() => router.push(`/admin/products/${productId}`)}>
                    <Edit/>
                </StyledIconButton>


                <StyledIconButton onClick={() => handleDeleteProduct}>
                    <Delete/>
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default ProductRow;
