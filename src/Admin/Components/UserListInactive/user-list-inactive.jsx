import MetaData from "../../../components/Metadata/metadata";
import UserListFreelancer from "./inactive-user-list";

const UserListActive = () => {
  return (
    <div className="overflow-x-auto mx-2 shadow-md sm:rounded-lg">
      <MetaData title="Freelancers" description="Freelancers" />
      <table className="w-full mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          <UserListFreelancer />
        </tbody>
      </table>
    </div>
  );
};

export default UserListActive;
