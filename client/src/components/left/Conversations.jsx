import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import toast from "react-hot-toast";

function Conversations() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectd, setSelected] = useState();

  useEffect(() => {
    fetchUsersForSidebar();
  }, []);

  async function fetchUsersForSidebar() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      setUsers(data.data);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {users.map((user) => (
        <Conversation
          key={user._id}
          user={user}
          setSelected={setSelected}
          selectd={selectd}
        />
      ))}
      {isLoading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
