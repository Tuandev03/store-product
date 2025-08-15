import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Product } from "../../services/ProductServices/ProductServices";
import "./CategorySidebar.scss"; // Import your styles
const CategorySidebar = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Product.getAllProducts(); // lấy toàn bộ sản phẩm
        const data = response.data;
        setProducts(data);

        // Lấy danh sách category không trùng
        const uniqueCategories = [...new Set(data.map((p) => p.category.name))];
        setCategories(uniqueCategories);

        console.log("Products fetched:", data);
        console.log("Categories fetched:", uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Hàm render sản phẩm
  const renderProducts = (list) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {list.map((p) => (
          <div key={p.id} style={{ width: "200px", background: "#222", padding: "10px", borderRadius: "8px" }}>
            <img src={p.images[0]} alt={p.title} style={{ width: "100%", borderRadius: "8px" }} />
            <div className="">
              <h1 className="font-semibold text-lg" style={{ color: "#fff" }}>{p.category.name}</h1>
            <p className="tagHeading" style={{ color: "#fff" }}>{p.description}</p>
            <div className="flex justify-between items-center mt-2">
              <p style={{ color: "#aaa" }}>
              ${p.price}</p>
              <button className="text-white bg-purple-500 py-2 px-4 rounded-lg font-semibold ">Add to cart</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Tabs
        tabPosition="left"
        items={[
          {
            label: "All",
            key: "all",
            children: renderProducts(products), // Tab 1 hiển thị tất cả
          },
          ...categories.map((cat) => ({
            label: cat,
            key: cat,
            children: renderProducts(products.filter((p) => p.category.name === cat)), // Lọc theo category
          })),
        ]}
      />
    </div>
  );
};

export default CategorySidebar;
