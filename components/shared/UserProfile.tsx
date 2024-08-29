import { getCurrentUserInfo } from "@/lib/actions/database.action";
import { UserActions } from "../(main)/UserActions";

export async function UserProfile() {
  const { data } = await getCurrentUserInfo();
  if (!data) return null;
  const name = data.name;
  const initials = name
    .split(" ")
    .map((word: any) => word[0])
    .join("");

  return <UserActions initials={initials} />;
}
