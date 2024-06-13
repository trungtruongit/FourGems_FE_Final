import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box, Button, TextField } from "@mui/material";
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
import DropZone from "../../../components/DropZone";
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
    const [newProductName, setProductName] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [newLaborCost, setNewLaborCost] = useState("");
    const [newRatioPrice, setNewRatioPrice] = useState("");
    const [newQuantityInStock, setNewQuantityInStock] = useState("");
    const [newStonePrice, setNewStonePrice] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newGem, setNewGem] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newActive, setNewActive] = useState("");
    const Object = {
        newProductName: newProductName,
        newWeight: newWeight,
        newLaborCost: newLaborCost,
        newRatioPrice: newRatioPrice,
        newQuantityInStock: newQuantityInStock,
        newStonePrice: newStonePrice,
        newDescription: newDescription,
        newGem: newGem,
        newImage: newImage,
        newCategoryName: newCategoryName,
        newActive: newActive,
    };
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
        // {
        //     "productId": "86",
        //     "barCode": "123",
        //     "productName": "test product",
        //     "weight": "99.3",
        //     "price": "99.4",
        //     "laborCost": "99.1",
        //     "ratioPrice": "99.1",
        //     "costPrice": "99.3",
        //     "stonePrice": "99.2",
        //     "isGem": 0,
        //     "image": "99",
        //     "quantityInStock": "99",
        //     "description": "this is test product",
        //     "goldId": "50",
        //     "typeId": "30",
        //     "collectionId": "1001"
        // }
        console.log(
            productId,
            barCode,
            productName,
            weight,
            price,
            laborCost,
            ratioPrice,
            costPrice,
            stonePrice,
            isGem,
            image,
            quantityInStock,
            description,
            goldId,
            typeId,
            collectionId
        );
        try {
            const respone = await axios.put(
                `https://four-gems-api-c21adc436e90.herokuapp.com/product/update-product=${productId}`,
                {
                    productId: productId,
                },
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
                    {edit ? (
                        <>
                            <DropZone />
                        </>
                    ) : (
                        <>
                            <Avatar
                                src={convertBase64ToImage(image)}
                                sx={{
                                    borderRadius: "8px",
                                    width: "80px",
                                    height: "80px",
                                }}
                            />
                        </>
                    )}
                </FlexBox>
            </StyledTableCell>

            <StyledTableCell align="left">
                <FlexBox alignItems="center" gap={1.5}>
                    {edit ? (
                        <TextField
                            fullWidth
                            name="productName"
                            label="Product Name"
                            color="info"
                            size="medium"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    ) : (
                        <Paragraph>{productName}</Paragraph>
                    )}
                </FlexBox>
            </StyledTableCell>

            <StyledTableCell align="left">{productId}</StyledTableCell>
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
            <StyledTableCell align="left">{quantityInStock}</StyledTableCell>
            <StyledTableCell align="left">{description}</StyledTableCell>
            <StyledTableCell align="left">
                {gem ? <CheckIcon /> : <ClearIcon />}
            </StyledTableCell>
            <StyledTableCell align="left">
                {active ? <CheckIcon /> : <ClearIcon />}
            </StyledTableCell>

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
