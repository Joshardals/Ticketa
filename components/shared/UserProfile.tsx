import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUserInfo } from "@/lib/actions/database.action";
import { getColorForId } from "@/lib/utils";

export async function UserProfile() {
  const { data } = await getCurrentUserInfo();
  if (!data) return null;
  const name = data.name;
  const initials = name
    .split(" ")
    .map((word: any) => word[0])
    .join("");
  const bgColor = getColorForId(data.$id);

  return (
    <div className="rounded-full max-sm:w-full flex justify-end">
      <div
        className={`cursor-pointer transition-all duration-100 ease-linear border-0 hover:border-2 hover:border-sunsetOrange rounded-full size-10 text-softWhite flex items-center justify-center `}
        style={{ background: bgColor }}
      >
        {initials}
      </div>
    </div>
  );
}
