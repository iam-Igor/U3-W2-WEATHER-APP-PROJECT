import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import MyFooter from "./components/MyFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";

const App = () => {
  const [searchvalue, setSearchValue] = useState("London");
  const [nameOfthecity, setNameOfTheCity] = useState([]);
  const [getSearch, setGetSerch] = useState(false);

  const setSearch = (param) => {
    setSearchValue(param);
    setGetSerch(true);
  };

  const getDataByCityName = () => {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        searchvalue +
        ",&limit=1&appid=25b79b4a25cd7a32ae9e3bdea7231540"
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
        setGetSerch(true);
        setNameOfTheCity(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataByCityName();
  }, []);

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
            <MainContent search={nameOfthecity[0]} getSearch={getSearch} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
};

export default App;
