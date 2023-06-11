import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";
import { useAuth } from "8base-react-sdk";
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
import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import { useLogout } from "@/src/hooks/useLogout";


export const Navbar = () => {
  const { asPath, push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const apolloClient = useApolloClient();
  const { authClient } = useAuth();
  const onLogoutClick = useLogout();

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
