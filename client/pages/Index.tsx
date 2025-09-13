import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import { useRestaurantsQuery, useRestaurantDetailQuery } from "@/services/queries/resto";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/store";
import { useMemo, useState, useEffect } from "react";

export default function Index() {
  const { q, category, sort } = useAppSelector((s) => s.filters);
  const { data: restos, isLoading: loadingRestos } = useRestaurantsQuery({ q });
  const [activeRestoId, setActiveRestoId] = useState<number | string | undefined>(undefined);
  const { data: activeResto, isLoading: loadingDetail } = useRestaurantDetailQuery(activeRestoId);

  // pick first restaurant by default when loaded
  const firstId = useMemo(() => (restos && restos[0]?.id) ?? undefined, [restos]);

  // when restaurants load, pick first as active if none selected
  useEffect(() => {
    if (firstId !== undefined && activeRestoId === undefined) {
      setActiveRestoId(firstId);
    }
  }, [firstId, activeRestoId]);

  const items = useMemo(() => {
    const menus = (activeResto?.menus ?? []) as any[];
    let filtered = menus;
    if (category) filtered = filtered.filter((m) => m.type === category);
    if (q) filtered = filtered.filter((m) => m.foodName?.toLowerCase().includes(q.toLowerCase()));
    if (sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") filtered = [...filtered].sort((a, b) => a.foodName.localeCompare(b.foodName));
    if (sort === "rating") filtered = filtered; // no rating on menus in API sample
    return filtered;
  }, [activeResto, category, q, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <div className="h-[380px] w-full bg-[url('/placeholder.svg')] bg-cover bg-center" aria-hidden />
        <Navbar className="absolute top-0 left-0 right-0" />
        <div className="relative max-w-6xl mx-auto pt-28 pb-12 px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold">Explore Culinary Experiences</h1>
          <p className="mt-2 text-lg opacity-90">Cari dan temukan restoran terbaik untuk Anda.</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <FilterBar />

        {/* Restaurant selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {loadingRestos && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-40 rounded-full" />
              ))}
            </>
          )}
          {restos?.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRestoId(r.id)}
              className={`px-4 py-2 rounded-full border ${
                (activeRestoId ?? firstId) === r.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        {loadingDetail && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        )}
        {!loadingDetail && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((m) => (
              <ProductCard key={m.id} item={m} />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-12 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-extrabold">Foody</div>
            <p className="mt-2 text-sm opacity-80">
              Nikmati rasa rumahan & menu chef setiap hari. Pesan online atau kunjungi cabang terdekat.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2">Explore</div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>All Food</li>
              <li>Nearby</li>
              <li>Discount</li>
              <li>Best Seller</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Help</div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>How to Order</li>
              <li>Payment Methods</li>
              <li>Track My Order</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
