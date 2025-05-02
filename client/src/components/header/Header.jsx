import { useState } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logoImage from "@/assets/Images_PNG/logon.png";
import NavLink from "../header/NavLink";
import { navItems } from "./navItems";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#07706D",
          minHeight: "65px",
          position: "fixed",
        }}
        component="nav"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flex justify-start w-full">
            <a href="https://balady.gov.sa/ar">
              <img
                src={logoImage}
                alt="logo"
                style={{ maxWidth: "108px", maxHeight: "50px" }}
                className="mt-2 md:mt-0"
              />
            </a>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "35px",
                mr: "25px",
              }}
            >
              {navItems.map((item, i) => (
                <NavLink key={i} headerTitle={item} />
              ))}
            </Box>
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: { xs: 6 }, mt: 1, display: { md: "none" } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
        {mobileOpen && (
          <nav>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
                m: "30px",
              }}
            >
              {navItems.map((item, i) => (
                <NavLink mobile={true} key={i} headerTitle={item} />
              ))}
            </Box>
          </nav>
        )}
      </AppBar>
    </>
  );
}

export default Header;
