import { createSelector } from 'reselect';

const selectAllProducts = (state) => state.shop.products;

const selectProductRecommendations = createSelector(
  [selectAllProducts],
  (products) => {
    const productsCopy = [...products];
    const sortedProducts = productsCopy.sort((a, b) => b.salesCount - a.salesCount);
    const recommendations = sortedProducts.slice(0, 10);
    return recommendations;
  }
);

export { selectProductRecommendations };
