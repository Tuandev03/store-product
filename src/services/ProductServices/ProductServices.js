import { http } from "../config";
export const Product = {
  getAllProducts: (limit=10,offset=0) => {
    return http.get(`/products?offset=${limit}&limit=${offset}`);
  },
};

// export default Product;
