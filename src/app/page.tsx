import { auth } from "@/auth";
import { SignInButton } from "@/components/signin-button";
import { SignOutButton } from "@/components/signout-button";

const Home = async () => {
  const session = await auth();

  // if (!session.user) return null;

  return (
    <div className="container mx-auto">
      <h1>Next JS Stater App</h1>
      {session?.user ? <p>{session.user.email}</p> : null}
      <div className="flex gap-2">
        {!session?.user ? <SignInButton /> : null}
        {session?.user ? <SignOutButton /> : null}
      </div>
    </div>
  );
};

export default Home;
