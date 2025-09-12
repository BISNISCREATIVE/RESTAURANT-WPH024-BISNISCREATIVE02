import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/features/cart/cartSlice";
import type { MenuItem } from "@/types";

export default function ProductCard({ item }: { item: MenuItem }) {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(
      addToCart({ id: item.id, name: item.foodName, price: item.price, qty: 1, imageUrl: item.image })
    );
  };
  return (
    <Card className="overflow-hidden">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.foodName}
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <CardContent className="p-4 space-y-2">
        <div className="line-clamp-1 font-semibold">{item.foodName}</div>
        <div className="text-sm text-muted-foreground">Rp {item.price.toLocaleString("id-ID")}</div>
        <Button className="w-full" onClick={handleAdd}>Tambah</Button>
      </CardContent>
    </Card>
  );
}
