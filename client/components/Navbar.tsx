import { useAppDispatch, useAppSelector } from "@/store";
import { setQuery } from "@/features/filters/filterSlice";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Navbar({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const q = useAppSelector((s) => s.filters.q);
  const itemsCount = useAppSelector((s) => s.cart.items.reduce((a, b) => a + b.qty, 0));
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("w-full z-20", className)}>
      <div className="max-w-6xl mx-auto flex items-center gap-4 p-4">
        <div className="text-2xl font-extrabold text-primary">Foody</div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-3 max-w-lg w-full">
          <Input
            placeholder="Cari restoran, makanan, minuman"
            value={q}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            className="rounded-full bg-white/90"
          />
        </div>
        <Button variant="secondary" className="relative rounded-full" onClick={() => setOpen(true)} aria-label="Open cart">
          <ShoppingBag className="size-5" />
          {itemsCount > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
              {itemsCount}
            </span>
          )}
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-[480px]">
          <SheetHeader>
            <SheetTitle>Keranjang</SheetTitle>
          </SheetHeader>
          <CartDrawer onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
