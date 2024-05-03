import React, { useState, useEffect } from "react";

import {
  collection,
  setDoc,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../utils/Firebase";

const AdminPanel = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  const getAllProducts = async () => {
    try {
      //Getting all products from Firebase
      const querySnapshot = await getDocs(collection(db, "products"));
      // Setting it in our local state so can be used later for edit or delete
      setProducts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log("🚀 ~ getAllProducts ~ error:", error);
    }
  };
  useEffect(() => {
    if (!products.length) {
      getAllProducts();
    }
    setLoading(false);
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      //Adding product (No condition for duplicate was given so duplicate can be added)
      await addDoc(collection(db, "products"), {
        name: newProductName,
        description: newProductDescription,
      });
      setNewProductName("");
      setNewProductDescription("");
      getAllProducts();
    } catch (error) {
      alert('Unable to add product');

      console.log("🚀 ~ handleAddProduct ~ error:", error);
    }
  };

  const handleEditProduct = async (productId, newName, newDescription) => {
    try {
      //Editing Product
      await setDoc(doc(db, "products", productId), {
        id: productId,
        name: newName,
        description: newDescription,
      });

      setEditingProductId(null);
      getAllProducts();
    } catch (error) {
      alert('Unable to edit product');

      console.log("🚀 ~ handleEditProduct ~ error:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      //Deleting Product
      await deleteDoc(doc(db, "products", productId));
      getAllProducts();

      setEditingProductId(null);
      getAllProducts();
    } catch (error) {
      alert('Unable to delete product');

      console.error("Error editing product: ", error);
    }
  };
  if (loading) {
    // initially loading
    return <div>Loading...</div>;
  }
  // Showing text to sign in to use this route
  //basic form is there
  return (
    <>
      {localStorage.getItem("user") ? (
        <>
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
            <form onSubmit={handleAddProduct} className="mb-8">
              <input
                type="text"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full border rounded-md px-4 py-2 mb-4"
              />
              <input
                type="text"
                placeholder="Product Description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                className="w-full border rounded-md px-4 py-2 mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </button>
            </form>
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul>
              {products.length > 0 ? (
                products.map((product) => (
                  <li key={product.id} className="border rounded-md p-4 mb-4">
                    {editingProductId === product.id ? (
                      <>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="w-full border rounded-md px-4 py-2 mb-2"
                        />
                        <input
                          type="text"
                          value={productDescription}
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                          className="w-full border rounded-md px-4 py-2 mb-2"
                        />
                        <button
                          onClick={() =>
                            handleEditProduct(
                              product.id,
                              productName,
                              productDescription
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="mb-2">{product.name}</div>
                        <div className="mb-2">{product.description}</div>
                        <button
                          onClick={() => {
                            setEditingProductId(product.id);
                            setProductName(product.name);
                            setProductDescription(product.description);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <div>No Products Found</div>
              )}
            </ul>
          </div>
        </>
      ) : (
        <div>Please Login to Continue</div>
      )}
    </>
  );
};

export default AdminPanel;
