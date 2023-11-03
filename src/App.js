import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import MainContent from "./components/MainContent";
import { useState } from "react";
import MyHeader from "./components/MyHeader";

function App() {
  const [searchvalue, setSearchValue] = useState([]);
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
        setNameOfTheCity(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <MyNavbar
        submit={getDataByCityName}
        search={searchvalue}
        setSearch={setSearch}
      />
      <MyHeader />
      <MainContent search={nameOfthecity[0]} getSearch={getSearch} />
    </div>
  );
}

export default App;
