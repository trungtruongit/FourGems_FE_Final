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
import axios from "axios"; // ========================================================================

// ========================================================================
const ProductRow = ({product}) => {
    const {productName, price, image, description, productId, categoryName} = product;
    const router = useRouter();
    const ProductBox = ({ productName, productId }) => {
        const productCode = productId ? productId.split("-")[0] : "N/A";
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
                        <Small color="grey.600">#{ProductBox}</Small>
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


                <StyledIconButton>
                    <Delete/>
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default ProductRow;
