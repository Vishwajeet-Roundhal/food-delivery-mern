import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-alice-carousel";


const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10 "
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid item xs={12} s={6} md={3}>
          <Typography className="pb-5" variant="h6" >
            Company
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" >
              About
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Blog
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Jobs
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Partner
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} s={6} md={3}>
          <Typography className="pb-5" variant="h6" >
            Solutions
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" >
              About
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Blog
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Jobs
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Partner
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} s={6} md={3}>
          <Typography className="pb-5" variant="h6" >
            Marketing
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" >
              About
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Blog
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Jobs
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Partner
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} s={6} md={3}>
          <Typography className="pb-5" variant="h6" >
            Commerse
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" >
              About
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Blog
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Jobs
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" >
              Partner
            </Button>
          </div>
        </Grid>
        <Grid
      item
      xs={12}
      className="bg-black text-center text-white py-6"
    >
      <Typography variant="body2" className="mb-2">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
      <Typography variant="body2" className="mb-2">
        <Link href="/privacy-policy" color="inherit" className="underline">
          Privacy Policy
        </Link>
        {" | "}
        <Link href="/terms-of-service" color="inherit" className="underline">
          Terms of Service
        </Link>
      </Typography>
      <Typography variant="body2">
        Follow us on 
        {" "}
        <Link href="https://twitter.com" color="inherit" className="underline">
          Twitter
        </Link>
        , 
        {" "}
        <Link href="https://facebook.com" color="inherit" className="underline">
          Facebook
        </Link>
        , and 
        {" "}
        <Link href="https://instagram.com" color="inherit" className="underline">
          Instagram
        </Link>
      </Typography>
    </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
