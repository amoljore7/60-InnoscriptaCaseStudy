import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem, Typography, Box, Container, FormHelperText } from "@mui/material";

const categories = ["Technology", "Business", "Health", "Entertainment", "Sports"];
const sources = ["BBC News", "New York Times", "The Guardian"];

const FilterBar = ({ filters, setFilters, onSearch }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle category/source conflict
    if (name === 'category' && value && filters.source) {
      setError("You cannot select both a category and a source at the same time.");
    } else if (name === 'source' && value && filters.category) {
      setError("You cannot select both a category and a source at the same time.");
    } else {
      setError('');
    }

    // Update filter state
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", paddingBottom: 4 }}>
      <Container sx={{ paddingTop: 4, textAlign: "center" }}>
        <Typography variant="h3" color="primary" gutterBottom>
          News Aggregator
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Stay updated with the latest news from various sources
        </Typography>
      </Container>

      <Container>
        <Grid container spacing={3} sx={{ paddingTop: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Keyword"
              name="keyword"
              value={filters.keyword}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={filters.category}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <MenuItem value="">None</MenuItem>
              {categories?.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Source"
              name="source"
              value={filters.source}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <MenuItem value="">None</MenuItem>
              {sources?.map((src) => (
                <MenuItem key={src} value={src}>
                  {src}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={filters.date}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={onSearch}
              sx={{
                backgroundColor: "#007bff",
                "&:hover": { backgroundColor: "#0056b3" },
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Error or Note */}
      {error && (
        <Container sx={{ paddingTop: 2 }}>
          <FormHelperText error>{error}</FormHelperText>
        </Container>
      )}
    </Box>
  );
};

export default FilterBar;
