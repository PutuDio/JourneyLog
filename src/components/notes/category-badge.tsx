import { Badge } from "@/components/ui/badge";

export function CategoryBadge({ name }: { name: string }) {
  const variant =
    name === "Travel" ? "travel" : name === "Daily" ? "daily" : name === "Gym" ? "gym" : "secondary";
  return <Badge variant={variant}>{name}</Badge>;
}
