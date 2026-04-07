import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../service";

export default function Dashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const data = await getCurrentUser();

        setUser(data.user);

      } catch {

        window.location.href = "/login";

      }
    };

    fetchUser();

  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Halo {user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
