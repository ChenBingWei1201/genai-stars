import { Badge } from "@/components/ui/badge";

function Tag({ tag }: { tag: string }) {
  return (
    <div>
      <Badge variant="outline" className="text-14">
        #{tag}
      </Badge>
    </div>
  );
}

export default Tag;
