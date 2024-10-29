import { createContext, useState } from "react";

export const UserData = createContext();

const UserProvider = (props) => {
  const [userData, setUserData] = useState([]);

  const changeData = (data) => {
    setUserData(data);
  };

  return (
    <UserData.Provider value={{ userData, changeData }}>
      {props.children}
    </UserData.Provider>
  );
};

export default UserProvider;