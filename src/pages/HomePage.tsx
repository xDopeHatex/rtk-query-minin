import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);

  const {
    isLoading: areUsersLoading,
    isError: isErrorUsers,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [
    fetchRepos,
    { isLoading: areReposLoading, isError: isErrorRepos, data: repos },
  ] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isErrorUsers && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}
      <div className="relative w-[560px] ">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className="absolute list-none top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            {areUsersLoading && <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                key={user.id}
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}
          {repos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
