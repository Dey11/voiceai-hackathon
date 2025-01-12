"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "@clerk/nextjs";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

const ProductsList = () => {
  const user = useSession();
  const userId = user.session?.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  const addNewProduct = async (newProduct: Product) => {
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();

      if (data.status === 200) {
        fetchProducts();
      } else {
        throw new Error(data.msg);
        setError(data.msg);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const editProduct = async (editedProduct: Product) => {
    try {
      const res = await fetch("/api/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
      const data = await res.json();

      if (data.status === 200) {
        fetchProducts();
      } else {
        throw new Error(data.msg);
        setError(data.msg);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <div className="mt-16">
      <div className="mb-4 flex w-full flex-row-reverse items-center justify-between">
        <Button
          className="flex items-center gap-x-2 bg-brand-foreground text-lg text-black hover:bg-brand-foreground/80"
          onClick={() =>
            addNewProduct({
              name: "DemoProd1",
              price: 100,
              description: "DemoProdDesc",
            })
          }
        >
          Add new product
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="rounded-lg bg-[#232323] py-5">
        <div className="grid grid-cols-12 items-center gap-4 px-1 text-center text-xl text-brand-foreground">
          <p className="col-span-2">No.</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-5">Description</p>
          <p className="col-span-2">Price</p>
        </div>
        {products.map((product, no) => (
          <div
            key={no}
            className="mt-2 grid grid-cols-12 items-center gap-4 truncate text-center text-brand-foreground transition-all delay-100 duration-100 hover:bg-black/20"
          >
            <p className="col-span-2 px-1"> {no + 1}</p>
            <p className="col-span-2 truncate px-1">{product.name}</p>
            <p className="col-span-5 truncate px-1">{product.description}</p>
            <p className="col-span-2 px-1"> {product.price}</p>
            <div className="col-span-1 flex items-center justify-center">
              <Pencil className="size-4" />
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default ProductsList;

const productsArray = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1 is my description",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2 is my description",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description 3 is my description",
    price: 300,
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description 4 is my description",
    price: 400,
  },
];
