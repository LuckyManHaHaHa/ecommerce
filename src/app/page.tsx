import { auth } from "../../auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  const { user } = session || {};

  return (
    <>
      {user ? (
        <div className="flex justify-end items-center gap-1">
          <div className="text-[20px] text-black mt-2 text-right">
            Welcome <span className="font-medium">{user?.name}</span>
          </div>
          <Image
            src={user?.image || "/default-profile.png"}
            alt="User Profile"
            width={50}
            height={50}
          />
        </div>
      ) : (
        <div>Home page</div>
      )}
    </>
  );
}
