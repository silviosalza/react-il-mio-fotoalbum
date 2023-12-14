import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="font-bold text-3xl">
        Dashboard di {user?.name} - Form di creazione post
      </h1>
    </>
  );
}
