import React,{useState} from "react";
import GooglePayButton from '@google-pay/button-react';
import axios from "axios";
import { useHistory } from "react-router";
import { BaseUrl } from "../constants/baseUrl";
import SnackbarAlert from "../constants/SnackbarAlert";

function Googlepay(props) {
    const history = useHistory()
    const [openSnackbarPlaced, setOpenSnackbarPlaced] = useState(false);
    const [openSnackbarError, setOpenSnackbarError] = useState(false);

    const handleClickSnackbar = (msg) => {
        if (msg === "placed") {
            setOpenSnackbarPlaced(true);
        } else if (msg === "error") {
            setOpenSnackbarError(true);
        }
    };
    const handleCloseSnackbarPlaced = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarPlaced(false);
    };
    const handleCloseSnackbarError = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarError(false);
    };


    //PlaceOrder Function
    const placeOrder = () => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const addressID = {
                addressId: `${props.selectedAddress}`,
            };
            axios
                .post(`${BaseUrl}/api/order/place`, addressID, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(() => {
                    handleClickSnackbar("placed");
                    setTimeout(() => {
                        history.push("/profile");
                    }, 2000);
                })
                .catch(() => {
                    handleClickSnackbar("error");
                });
        }
    };
    return (
        <>
            <GooglePayButton
                environment="TEST"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: "CARD",
                            parameters: {
                                allowedAuthMethods: [
                                    "PAN_ONLY",
                                    "CRYPTOGRAM_3DS",
                                ],
                                allowedCardNetworks: ["MASTERCARD", "VISA"],
                            },
                            tokenizationSpecification: {
                                type: "PAYMENT_GATEWAY",
                                parameters: {
                                    gateway: "example",
                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantId: "12345678901234567890",
                        merchantName: "Demo Merchant",
                    },
                    transactionInfo: {
                        totalPriceStatus: "FINAL",
                        totalPriceLabel: "Total",
                        totalPrice: "1",
                        currencyCode: "INR",
                        countryCode: "IN",
                    },
                    shippingAddressRequired: true,
                    callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                }}
                onLoadPaymentData={(paymentRequest) => {
                    // console.log("load payment data", paymentRequest);
                }}
                onPaymentAuthorized={paymentData => {
                    // console.log('Payment Authorised Success', paymentData)
                    placeOrder()
                    return { transactionState: 'SUCCESS'}
                  }
                }
                onPaymentDataChanged={paymentData => {
                    // console.log('On Payment Data Changed', paymentData)
                    return { }
                  }
                }
                existingPaymentMethodRequired='false'
                buttonColor='black'
                buttonType='Buy'
            />

            <SnackbarAlert
                open={openSnackbarPlaced}
                close={handleCloseSnackbarPlaced}
                type={"success"}
                msg={"Order Placed! Thank for Ordering"}
            />
            <SnackbarAlert
                open={openSnackbarError}
                close={handleCloseSnackbarError}
                type={"error"}
                msg={"Please Select Address"}
            />
        </>
    );
}

export default Googlepay;
