import { useAuth } from "8base-react-sdk";
import { useLogout } from "@/src/hooks/useLogout";
import { useApolloClient } from "@apollo/client";
import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * Navigation bar component.
 *
 * Shows the navigation bar with options like search and log out.
 *
 * @returns {ReactElement} The Navbar component.
 */
export const Navbar = () => {
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const onLogoutClick = useLogout();

  /**
   * Manage the search term.
   * Redirects to the search page if the term is not empty.
   */
  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Task </Typography>
            <Typography sx={{ ml: 0.5 }}>List</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box flex={1} />

        {/* Pantallas pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <Button onClick={onLogoutClick}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};
