import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import MainContent from "./components/MainContent";
import { useState } from "react";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";

const App = () => {
  const [searchvalue, setSearchValue] = useState("");
  const [nameOfthecity, setNameOfTheCity] = useState([]);
  const [getSearch, setGetSerch] = useState(false);
  const [wrongCity, setWrongCity] = useState(false);


  const setSearch = (param) => {
    setSearchValue(param);
    setGetSerch(true);
  
  };

  const getDataByCityName = () => {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        searchvalue +
        ",&limit=1&appid=0558a26d894990857b4f5ee4b1604f20"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("error in fetching name of the city");
        }
      })
      .then((data) => {
        console.log(data);
        if (data.length <= 0 || data) {
          console.log("città sbagliata ")
          
          setWrongCity(true);
          
        }
        setNameOfTheCity(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
      <MyNavbar
        submit={getDataByCityName}
        search={searchvalue}
        setSearch={setSearch}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <MainContent
              search={nameOfthecity[0]}
              getSearch={getSearch}
              wrongCity={wrongCity}
              
            />
          }
        />
        <Route path="*" element={<NotFound setSearch={setSearch} />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
};

export default App;
