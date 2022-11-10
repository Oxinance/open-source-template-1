import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Client from "../../Client";
import {useState} from "react";
import Button from "@mui/material/Button";

const currencies = {
    "eur": "€"
}

function ProductCard({product, style}) {

    const [loading, setLoading] = useState(false)
    const [btnLabel, setBtnLabel] = useState("Add to cart")

    const addToCart = (product) => {
        setLoading(true)
        setBtnLabel("Adding")

        const callback = (response) => {
            console.log(response)
            setBtnLabel("Added")
            setTimeout(
                function() {
                    setLoading(false)
                    setBtnLabel("Add to cart")
                }, 1000);
        }

        const errorCallback = (error) => {
            setLoading(false)
            setBtnLabel("Error occurred")
        }

        Client.addProductToCart(product, 1, callback, errorCallback)
    }

    return (
        <Card key={product.id} sx={{ width: 300, ...style }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "#6772E5", boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.50)" }} aria-label="recipe">
                        <svg className="SVGInline-svg SVGInline--cleaned-svg SVG-svg BrandIcon-svg BrandIcon--size--32-svg"
                             height="42" width="42" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <g fill="none" fillRule="evenodd">
                                <path fill="#6772E5" d="M0 0h32v32H0z"></path>
                                <path fill="#FFF" fillRule="nonzero"
                                      d="M14.56 12.33c0-.78.64-1.08 1.7-1.08 1.52 0 3.43.46 4.95 1.28v-4.7c-1.66-.65-3.3-.91-4.95-.91-4.05 0-6.75 2.11-6.75 5.65 0 5.5 7.59 4.63 7.59 7 0 .92-.8 1.22-1.92 1.22-1.65 0-3.77-.68-5.45-1.6v4.75c1.86.8 3.74 1.14 5.45 1.14 4.15 0 7-2.05 7-5.63-.01-5.94-7.62-4.89-7.62-7.12z"></path>
                            </g>
                        </svg>
                    </Avatar>
                }
                title={<p>{product.name}</p>}
                subheader={<p>{currencies[product.default_price?.currency]}{product.default_price?.unit_amount / 100}</p>}
            />
            <CardMedia
                component="img"
                height="169"
                image={product.images[0]}
            />
            <CardContent style={{height: 72}}>
                <Typography variant="body2" color="text.secondary">
                    {product.description?.length > 70 ? product.description.substring(0, 67) + "..." : product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => addToCart(product)}
                    disabled={loading}
                    type="submit"
                    style={{fontFamily: 'Poppins', fontSize: 12, height: 25, backgroundColor: "#5b52fc", textTransform: "none"}}
                    variant="contained"
                    size="small"
                    fullWidth={true}
                >
                    <p>{btnLabel}</p>
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;