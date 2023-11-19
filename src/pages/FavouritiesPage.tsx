import { useAppSelector } from "../hooks/redux";

const FavouritiesPage = () => {
  const { favourities } = useAppSelector((state) => state.github);

  if (favourities.length === 0) return <p className="text-center">No items</p>;

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourities.map((f) => (
          <li key={f}>
            {" "}
            <a href={f} target="_blank" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritiesPage;
