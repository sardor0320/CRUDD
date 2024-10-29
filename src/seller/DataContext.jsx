import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const getData = () => {
    axios.get('http://localhost:3000/products?_limit=8')
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error('Ma\'lumotlarni olishda xato:', err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <DataContext.Provider value={{ data, modalVisible, toggleModal, selectedItem, setSelectedItem }}>
      {children}
    </DataContext.Provider>
  );
};
