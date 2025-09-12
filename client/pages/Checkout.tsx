import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearCart } from "@/features/cart/cartSlice";
import type { Order } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const order: Order = {
      id: Math.random().toString(36).slice(2),
      items,
      total: subtotal,
      customerName: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      address: String(fd.get("address") || ""),
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const key = "orders";
      const current: Order[] = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([order, ...current]));
      dispatch(clearCart());
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Nama" required />
          <Input name="phone" placeholder="No HP" required />
          <Textarea name="address" placeholder="Alamat" required />
          <Button type="submit" disabled={loading || items.length === 0}>
            {loading ? "Menyimpan..." : "Buat Pesanan"}
          </Button>
        </form>
        <div className="bg-card rounded-lg p-4 space-y-3 h-fit">
          <div className="font-semibold">Ringkasan</div>
          {items.map((it) => (
            <div key={it.id} className="flex justify-between text-sm">
              <span>
                {it.name} x {it.qty}
              </span>
              <span>Rp {(it.qty * it.price).toLocaleString("id-ID")}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="text-xs text-muted-foreground">{dayjs().format("DD MMM YYYY HH:mm")}</div>
        </div>
      </div>
    </div>
  );
}
