import React, { useState } from "react";
import { Box, Snackbar } from "@mui/material";
import FilterBar from "../components/FilterBar";
import ArticleList from "../components/ArticleList";
import { fetchArticlesFromNewsAPI } from "../utils/fetchArticles";

const Home = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    date: "",
    source: "",
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    snackbarMessage:'',
    snackbarSeverity: '', 
  });
  const { vertical, horizontal } = openSnackbar;

  const handleSearch = async () => {
    setLoading(true);
    try {
      const fetchedArticles = await fetchArticlesFromNewsAPI(filters);
      
      if (!fetchedArticles || fetchedArticles.length === 0) {
        setArticles([])
      } else {
        setArticles(fetchedArticles.articles || []);
      }
    
      setOpenSnackbar({
        ...openSnackbar,
        open: true,
        snackbarMessage: 'Articles loaded successfully!',
        snackbarSeverity: 'success',
      });
    } catch (error) {
      setArticles([]);
      setOpenSnackbar({
        ...openSnackbar,
        open: true,
        snackbarMessage: error.message || 'Failed to load articles',
        snackbarSeverity: 'error',
      });
    } finally {
      setLoading(false);
    }
    
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false, })
  };

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      <ArticleList articles={articles} loading={loading} />
      <Box>
        <Snackbar
         anchorOrigin={{ vertical, horizontal }}
          open={openSnackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={openSnackbar.snackbarMessage}
          severity={openSnackbar.snackbarSeverity}
          key={vertical + horizontal}
        />
      </Box>
    </div>
  );
};

export default Home;
