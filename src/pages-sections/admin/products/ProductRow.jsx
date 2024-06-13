import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box, Button } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import {
    StyledTableRow,
    CategoryWrapper,
    StyledTableCell,
    StyledIconButton,
} from "../StyledComponents";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { convertBase64ToImage } from "../../../utils/convertBase64ToImage";
// ========================================================================

// ========================================================================
const ProductRow = ({ product }) => {
    const {
        productName,
        price,
        image,
        description,
        productId,
        categoryName,
        published,
        gem,
        weight,
        laborCost,
        ratioPrice,
        quantityInStock,
        stonePrice,
        active,
    } = product;
    const router = useRouter();
    const [update, setUpdate] = useState();
    const [edit, setEdit] = useState(false);
    const [nameCanChange, setNameCanChange] = useState("");
    const [categoryCanChange, setCategoryCanChange] = useState("");
    const [laborPriceCanChange, setLaborPriceCanChange] = useState("");
    const [ratioPriceCanChange, setRatioPriceCanChange] = useState("");
    const [stonePriceCanChange, setStonePriceCanChange] = useState("");
    const [weightCanChange, setWeightCanChange] = useState("");
    const [quantityCanChange, setQuantityCanChange] = useState("");
    const [descriptionCanChange, setDescriptionCanChange] = useState("");
    const [imageCanChange, setImageCanChange] = useState("");
    const [gemCanChange, setGemCanChange] = useState("");
    const [publishedAtCanChange, setPublishedAtCanChange] = useState("");

    console.log(image);
    const Object = {};
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
    const handleUpdateProduct = async () => {
        console.log(productId);

        try {
            const respone = await axios.post(
                `https://four-gems-api-c21adc436e90.herokuapp.com/product/update-product`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUpdate(respone.data.data);
            console.log(respone.data.data);
            console.log("OK");
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };
    const handleDeleteProduct = async (productId) => {
        // console.log(image);
        console.log(productId);
        try {
            await axios.delete(
                `https://four-gems-api-c21adc436e90.herokuapp.com/product/delete-product?productId=${productId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            window.location.reload();
        } catch (e) {
            console.log("Failed to delete product", e);
        }
    };
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">
                <FlexBox alignItems="center" gap={1.5}>
                    <Avatar
                        // src={image}
                        src={convertBase64ToImage(image)}
                        sx={{
                            borderRadius: "8px",
                            width: 40,
                            height: 40,
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
                {currency(laborCost)}
            </StyledTableCell>
            <StyledTableCell align="left">
                {currency(ratioPrice)}
            </StyledTableCell>
            <StyledTableCell align="left">
                {currency(stonePrice)}
            </StyledTableCell>

            <StyledTableCell align="left">{weight}</StyledTableCell>
            {/* <StyledTableCell align="left">
                <img
                    src={convertBase64ToImage(image)}
                    alt=""
                    width={40}
                    height={40}
                />
            </StyledTableCell> */}
            <StyledTableCell align="left">{quantityInStock}</StyledTableCell>
            <StyledTableCell align="left">{description}</StyledTableCell>
            <StyledTableCell align="left">
                {/*<BazaarSwitch*/}
                {/*    color="info"*/}
                {/*    checked={productGem}*/}
                {/*    onChange={() => setProductGem((state) => !state)}*/}
                {/*/>*/}
                {gem ? <CheckIcon /> : <ClearIcon />}
            </StyledTableCell>
            <StyledTableCell align="left">
                {active ? <CheckIcon /> : <ClearIcon />}
            </StyledTableCell>
            {/*<StyledTableCell align="left">*/}
            {/*    <BazaarSwitch*/}
            {/*        color="info"*/}
            {/*        checked={productPulish}*/}
            {/*        onChange={() => setProductPublish((state) => !state)}*/}
            {/*    />*/}
            {/*</StyledTableCell>*/}

            <StyledTableCell align="center">
                {edit ? (
                    <div>
                        <Button
                            sx={{
                                margin: "1px",
                                borderRadius: "10px",
                            }}
                            variant="contained"
                            color="info"
                            onClick={() => handleUpdateProduct()}
                        >
                            Confirm
                        </Button>
                        <Button
                            sx={{
                                margin: "1px",
                                width: "89.28px",
                                borderRadius: "10px",
                            }}
                            variant="contained"
                            color="error"
                            onClick={() => setEdit(!edit)}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div>
                        <StyledIconButton onClick={() => setEdit(!edit)}>
                            <Edit />
                        </StyledIconButton>
                    </div>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default ProductRow;