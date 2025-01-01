import React from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";

const ArticleCard = ({ article }) => (
  <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', '&:hover': { transform: 'scale(1.05)', transition: 'all 0.3s ease' } }}>
    <CardMedia
      component="img"
      height="140"
      image={article.urlToImage || "/path/to/default-image.jpg"}
      alt={article.title}
    />
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1, noWrap: true, textOverflow: "ellipsis" }}>
        {article.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
        {article.description}
      </Typography>
      {article.author && (
        <Typography variant="body2" color="text.secondary">
          By: {article.author}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
        Published on: {new Date(article.publishedAt).toLocaleDateString()}
      </Typography>
      {article.source?.name && (
        <Typography variant="body2" color="text.secondary">
          Source: {article.source.name}
        </Typography>
      )}
      <Link href={article.url} target="_blank" rel="noopener" variant="body2" color="primary">
        Read more
      </Link>
    </CardContent>
  </Card>
);

export default ArticleCard;
