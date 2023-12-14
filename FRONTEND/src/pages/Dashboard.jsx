import { useAuth } from "../contexts/AuthContext";
import CreateForm from "../components/CreateForm";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="font-bold text-3xl">Dashboard di {user?.name}</h1>
      <CreateForm></CreateForm>
    </>
  );
}
