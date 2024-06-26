import React, { useState, useEffect } from "react";
import { db } from "../utils/Firebase";
import { collection, getDocs } from "firebase/firestore";

export const Products = () => {
  const [products, setProducts] = useState([]);

  //Getting all products
  // Could have used this same component for CRUD operations in Admin component
  //  but for maintaning different design for just view did it with this component
  const getAllProducts = async () => {
    try {
      const productsData = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        productsData.push(doc.data());
      });
      setProducts(productsData);
    } catch (error) {
      console.log("🚀 ~ getAllProducts ~ error:", error);
    }
  };
  useEffect(() => {
    if (!products.length) {
      getAllProducts();
    }
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center mt-2">
              Products
            </h1>
            <div className="container mx-auto p-8">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-200 p-4 mb-4 rounded-md">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No Products Found</div>
      )}
    </>
  );
};
