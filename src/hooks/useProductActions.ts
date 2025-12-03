"use client";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProductFormData } from "@/types";
import { useToast } from "./use-toast";

export const useProductActions = () => {
  const { toast } = useToast();

  const addProduct = async (data: ProductFormData) => {
    try {
      await addDoc(collection(db, "products"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      return { success: true };
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const updateProduct = async (id: string, data: ProductFormData) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      return { success: true };
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const toggleProductStatus = async (
    id: string,
    currentStatus: "active" | "inactive"
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Success",
        description: `Product ${
          newStatus === "active" ? "activated" : "deactivated"
        }`,
      });

      return { success: true };
    } catch (error) {
      console.error("Error toggling product status:", error);
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
  };
};
