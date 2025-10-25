import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-background border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;