"use client";

import { useEffect, useState } from "react";

import { useSession } from "@clerk/nextjs";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/types";

const ProductsList = () => {
  const user = useSession();
  const userId = user.session?.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  const addNewProduct = async (newProduct: Product) => {
    try {
      await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const deleteProduct = async (deletedProduct: Product) => {
    try {
      await fetch("/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletedProduct),
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-16">
      <div className="mb-4 flex w-full flex-row-reverse items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-x-2 bg-brand-foreground text-lg text-black hover:bg-brand-foreground/80">
              Add new product
              <Plus className="size-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="border-brand-foreground bg-[#232323] text-brand-foreground">
            {/* <DialogHeader> */}
            <form
              action={(formData: FormData) => {
                const name = formData.get("name") as string;
                const description = formData.get("description") as string;
                const price = parseInt(formData.get("price") as string);
                addNewProduct({ name, description, price });
              }}
            >
              <DialogTitle className="text-2xl">Add new product</DialogTitle>
              <label id="name">
                Product Name
                <Input
                  type="text"
                  placeholder="Product name"
                  name="name"
                  id="name"
                  className="bg-[#232323]"
                />
              </label>

              <label>
                Description
                <Textarea
                  placeholder="Description"
                  id="description"
                  name="description"
                  className="bg-[#232323]"
                />
              </label>

              <label id="name">
                Price
                <Input
                  type="number"
                  placeholder="Price"
                  id="price"
                  name="price"
                  className="bg-[#232323]"
                />
              </label>

              <Button className="mt-4">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
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
              <Trash
                className="size-4 cursor-pointer"
                onClick={() => deleteProduct(product)}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default ProductsList;
