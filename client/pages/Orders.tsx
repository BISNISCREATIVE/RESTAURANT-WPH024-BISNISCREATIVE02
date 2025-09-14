import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/format";

export default function Orders() {
  const orders = (
    JSON.parse(localStorage.getItem("orders") || "[]") as any[]
  ).slice(0, 50);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">Order History</h1>
          {orders.length === 0 && (
            <div className="text-muted-foreground">No orders yet.</div>
          )}
          <div className="grid gap-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white border rounded-xl p-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{dayjs(o.createdAt).format("DD MMM YYYY HH:mm")}</span>
                  <span>{formatCurrency(o.total)}</span>
                </div>
                <ul className="mt-2 text-sm list-disc pl-6">
                  {o.items.map((it: any) => (
                    <li key={it.id}>
                      {it.name} × {it.qty}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
