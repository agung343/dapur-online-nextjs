"use server";
import { redirect } from "next/navigation";

export async function cartAction(prevState, formData) {
  const name = formData.get("name");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const cart = JSON.parse(formData.get("cart"));
  const totalPrice = Number(formData.get("totalPrice"));

  try {
    let errMsg = { name: "", address: "", phone: "" };
    if (!name || name.trim().length === 0) {
      errMsg.name = "Mohon nama di isi";
    }

    if (!address || address.trim().length === 0) {
      errMsg.address = "Mohon alamat di isi";
    }
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
      errMsg.phone = "Nomor HP minimal 10 angka";
    }

    if (!cart || cart.length === 0) {
      errMsg.cart = "Keranjang masih kosong";
    }

    if (Object.values(errMsg).some(msg => msg !== "")) {
      return { errMsg };
    }

    const orderDetail = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    return {    
      name: name,
      address: address,
      phone: phone,
      cart: orderDetail,
      total: totalPrice,
    };
  } catch (error) {
    console.error("Error processing order", error);
    throw new Error("Failed to process the order");
  }
}
