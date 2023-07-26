import UsersPending from "./user-pending";

const UserListPending = () => {
  return (
    <div className="overflow-x-auto mx-10 shadow-md sm:rounded-lg">
      <table className="w-full mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          <UsersPending />
        </tbody>
      </table>
    </div>
  );
};

export default UserListPending;
