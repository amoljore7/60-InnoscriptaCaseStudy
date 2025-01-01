import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography, Box, Container, TextField } from "@mui/material";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles, loading }) => {
  const [filters, setFilters] = useState({ authors: "" });
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // Handle filter change
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  // Filter articles based on author input
  useEffect(() => {
    if (filters.authors) {
      const filtered = articles.filter((article) =>
        article.author?.toLowerCase().includes(filters.authors.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [filters.authors, articles]);

  if (loading) return <CircularProgress sx={{ margin: "20px auto" }} />;

  if (filteredArticles?.length === 0) {
    return (
      <Container sx={{ paddingTop: 4, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary"> No articles Found.</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: "#f7f7f7",
        padding: 3,
        maxHeight: "calc(100vh - 180px)", // Adjust based on your header/filter height
        overflowY: "auto", // Enable scroll for the list
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Featured Articles
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Authors"
            name="authors"
            value={filters.authors}
            onChange={handleChange}
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredArticles?.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArticleList;
