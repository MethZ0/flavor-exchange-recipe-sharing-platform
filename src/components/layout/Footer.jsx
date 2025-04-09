import { Box, Container, Typography, Link } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            © {new Date().getFullYear()} FlavorExchange. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, md: 0 } }}>
            <Link href="#" color="inherit">
              <GitHubIcon />
            </Link>
            <Link href="#" color="inherit">
              <TwitterIcon />
            </Link>
            <Link href="#" color="inherit">
              <FacebookIcon />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

