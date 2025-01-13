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
import { Customer } from "@/lib/types";
import { CustomerType } from "@/lib/zod";

const CustomersList = () => {
  const user = useSession();
  const userId = user.session?.id;
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string>("");

  const addNewCustomer = async (newCustomer: CustomerType) => {
    try {
      await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      fetchCustomers();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const deleteCustomer = async (deletedCustomer: Customer) => {
    try {
      await fetch("/api/customer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletedCustomer),
      });

      fetchCustomers();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customer");
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (!user.isLoaded) {
    return (
      <div className="flex h-[50dvh] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-b-2 border-t-2 border-brand-foreground" />
      </div>
    );
  }

  return (
    <div className="mt-16 px-2">
      <div className="mb-4 flex w-full flex-row-reverse items-center justify-between px-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-x-2 bg-brand-foreground text-lg text-black hover:bg-brand-foreground/80">
              Add new customer
              <Plus className="size-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="border-brand-foreground bg-[#232323] text-brand-foreground">
            <form
              action={(formData: FormData) => {
                const name = formData.get("name") as string;
                const context = formData.get("context") as string;
                const number = parseInt(formData.get("number") as string);
                addNewCustomer({ name, context, number });
              }}
            >
              <DialogTitle className="text-2xl">Add new customer</DialogTitle>
              <label id="name">
                Customer Name
                <Input
                  type="text"
                  placeholder="Customer name"
                  name="name"
                  id="name"
                  className="bg-[#232323]"
                />
              </label>

              <label>
                Context/Notes
                <Textarea
                  placeholder="Context/Notes"
                  id="context"
                  name="context"
                  className="bg-[#232323]"
                />
              </label>

              <label id="number">
                Phone Number
                <Input
                  type="tel"
                  placeholder="Phone number"
                  id="number"
                  name="number"
                  pattern="[0-9]{10}"
                  className="bg-[#232323]"
                />
              </label>

              <Button className="mt-4 w-full bg-brand-foreground text-brand-bg hover:bg-brand-foreground/80">
                Save & start calls
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg bg-[#232323] py-5">
        <div className="grid grid-cols-12 items-center gap-4 px-1 text-center text-xl text-brand-foreground">
          <p className="col-span-2">No.</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-4">Context</p>
          <p className="col-span-2">Phone</p>
        </div>
        {customers.map((customer, no) => (
          <div
            key={customer.id}
            className="mt-2 grid grid-cols-12 items-center gap-4 truncate text-center text-brand-foreground transition-all delay-100 duration-100 hover:bg-black/20"
          >
            <p className="col-span-2 px-1">{no + 1}</p>
            <p className="col-span-3 truncate px-1">{customer.name}</p>
            <p className="col-span-4 truncate px-1">{customer.context}</p>
            <p className="col-span-2 px-1">{customer.number}</p>
            <div className="col-span-1 flex items-center justify-center">
              <Trash
                className="size-4 cursor-pointer"
                onClick={() => deleteCustomer(customer)}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default CustomersList;
