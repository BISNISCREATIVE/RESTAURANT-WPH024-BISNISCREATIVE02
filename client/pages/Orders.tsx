import type { Order } from "@/types";
import dayjs from "dayjs";

export default function Orders() {
  const orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Riwayat Pesanan</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">Belum ada pesanan.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{o.customerName}</div>
                  <div className="text-sm text-muted-foreground">{o.phone}</div>
                </div>
                <div className="text-sm text-muted-foreground">{dayjs(o.createdAt).format("DD MMM YYYY HH:mm")}</div>
              </div>
              <ul className="mt-2 text-sm">
                {o.items.map((it) => (
                  <li key={it.id} className="flex justify-between">
                    <span>
                      {it.name} x {it.qty}
                    </span>
                    <span>Rp {(it.qty * it.price).toLocaleString("id-ID")}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>Rp {o.total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
