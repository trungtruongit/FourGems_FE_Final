import {Delete, Edit} from "@mui/icons-material";
import {FlexBox} from "components/flex-box";
import {Paragraph} from "components/Typography";
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "./StyledComponents";
import {currency} from "lib";
import axios from "axios";
import {useRouter} from "next/router";
import {useState} from "react"; // ========================================================================

// ========================================================================
const CustomerRow = ({customer}) => {
    const {id, fullName, phoneNumber, address, roleName, revenue} = customer;
    const router = useRouter();
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
    const handleUpdateUser = async () => {
        try {
            const respone = await axios.post(`https://four-gems-api-c21adc436e90.herokuapp.com/user/get-user-information`, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            });
            setUpdate(respone.data.data);
            console.log(respone.data.data);
            console.log("OK")
        } catch (error) {
            console.error("Failed to update account:", error);
        }finally {
            await router.push('/admin/users/update')
        }
    }
    const handleDeleteUser = async () => {
        try {
            await axios.delete(`https://four-gems-api-c21adc436e90.herokuapp.com/user/delete?userId=${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
    };
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">
                <FlexBox alignItems="center" gap={1.5}>
                    <Paragraph>{fullName}</Paragraph>
                </FlexBox>
            </StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {phoneNumber}
            </StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {address}
            </StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {currency(revenue)}
            </StyledTableCell>

            <StyledTableCell
                align="left"
                sx={{
                    fontWeight: 400,
                }}
            >
                {roleName}
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton onClick={() => handleUpdateUser()}>
                    <Edit/>
                </StyledIconButton>
                <StyledIconButton onClick={() => handleDeleteUser()}>
                    <Delete/>
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default CustomerRow;
