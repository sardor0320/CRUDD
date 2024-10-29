import { useContext, useEffect } from "react";
import Card from "./card";
import { UserData } from "./usProvider";

const HomePage = () => {
  const { changeData, userData } = useContext(UserData);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        changeData(json);
      });
  }

  return (
    <div>
      <Card />
    </div>
  );
};

export default HomePage;