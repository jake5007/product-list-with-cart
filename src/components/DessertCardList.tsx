import DessertCard from "./DessertCard";
import data from "../data.json";

const DessertCardList = () => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((dessert) => (
        <li key={dessert.name}>
          <DessertCard {...dessert} />
        </li>
      ))}
    </ul>
  );
};
export default DessertCardList;
