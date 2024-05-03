import React, { useState, useEffect } from "react";

import {
  collection,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  DocumentReference,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuid } from 'uuid';

import { db } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
    // const [documentId , setDocumentId] = useState('')
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map((doc) => ({...doc.data(),id : doc.id})));
  console.log(user)

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
      await addDoc(collection(db, "products"), {
        name: newProductName,
        description: newProductDescription,
      });
      setNewProductName("");
      setNewProductDescription("");
      getAllProducts();
    } catch (error) {
      console.log("🚀 ~ handleAddProduct ~ error:", error)
    }
  };

  const handleEditProduct = async (productId, newName, newDescription) => {

  
    try {
          await setDoc(doc(db, 'products',productId), {
            id : productId,
            name: newName,
            description: newDescription,
          });
  

        setEditingProductId(null);
      getAllProducts();

    
        
    
  

      
    } catch (error) {
    console.log("🚀 ~ handleEditProduct ~ error:", error)
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
        await deleteDoc(doc(db, 'products',productId));
        getAllProducts();

      setEditingProductId(null);
    getAllProducts();

  
      
  


    
  } catch (error) {
    console.error("Error editing product: ", error);
  }
  };
  if (loading) {
    console.log("🚀 ~ AdminPanel ~ loading:", user)
    return <div>Loading...</div>;
  }

  return (
    <>
      { localStorage.getItem("user")
 ? (
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
              {products.map((product) => (
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
                        onChange={(e) => setProductDescription(e.target.value)}
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
              ))}
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
