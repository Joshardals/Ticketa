import { createAvatar } from "@dicebear/core";
import { adventurer, lorelei } from "@dicebear/collection";
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
    <div className="justify-self-end rounded-full">
      <div
        className={`cursor-pointer rounded-full size-10 text-softWhite flex items-center justify-center bg-[${bgColor}]`}
      >
        {initials}
      </div>
    </div>
  );
}
