import { signIn, signOut, auth } from "../../../auth";
import Image from "next/image";

export default async function SignIn() {
  const session = await auth();
  const { user } = session || {};
  if (user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div className="flex justify-end items-center gap-4">
          <div className="text-[20px] text-black mt-2">
            Welcom <span className="font-medium">{user.name}</span>
          </div>
          <Image
            src={user?.image || "/default-profile.png"}
            alt="User Profile"
            width={50}
            height={50}
          />
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer"
            type="submit"
          >
            Sign out
          </button>
        </div>
      </form>
    );
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer"
          type="submit"
        >
          Signin with Google
        </button>
      </div>
    </form>
  );
}
