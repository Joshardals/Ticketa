import { getCurrentUserInfo } from "@/lib/actions/database.action";
import { getColorForId } from "@/lib/utils";
import { UserActions } from "../(main)/UserActions";

export async function UserProfile() {
  const { data } = await getCurrentUserInfo();
  if (!data) return null;
  const name = data.name;
  const initials = name
    .split(" ")
    .map((word: any) => word[0])
    .join("");
  const bgColor = getColorForId(data.$id);

  return <UserActions bgColor={bgColor} initials={initials} />;
}
