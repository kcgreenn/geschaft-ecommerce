import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import useStyles from '../../utils/Styles';
import Page from '../../components/page';

const Category = () => {
  const classes = useStyles();
  const router = useRouter();
  const { category } = router.query;
  const [pageIndex, setPageIndex] = useState(0);
  const [catCount, setCatCount] = useState(1000);

  const handlePaginate = (event, value) => {
    setPageIndex(value);
    window.scrollTo(0, 0);
  };

  const getCount = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/categories/${category}/count`
    );
    setCatCount(data.count);
  };

  useEffect(() => {
    getCount();
  }, [catCount]);

  return (
    <Layout>
      <Typography variant="h1" component="h1">
        <strong>{category}:</strong>&nbsp;{catCount}&nbsp;Results
      </Typography>
      <div className={classes.pagiSection}>
        <Page index={pageIndex} category={category} />
        <div style={{ display: 'none' }}>
          <Page index={pageIndex + 1} />
        </div>
      </div>
      <Pagination
        count={
          Math.round(catCount / 15) > 1
            ? Math.round(catCount / 15) - 1
            : Math.round(catCount / 15)
        }
        color="secondary"
        page={pageIndex ? pageIndex : 1}
        variant="outlined"
        className={classes.pagination}
        onChange={handlePaginate}
      />
    </Layout>
  );
};

export default Category;
