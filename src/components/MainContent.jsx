import { useEffect, useState } from "react";

const MainContent = ({ search, getSearch }) => {
  const [cityData, setCityData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  console.log(search);
  console.log(cityData);

  const getDataByLongandlat = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        search.lat +
        "&lon=" +
        search.lon +
        "&appid=0558a26d894990857b4f5ee4b1604f20"
    )
      .then((res) => {
        if (res.ok) {
          console.log("res ok");
          return res.json();
        } else {
          throw new Error("error");
        }
      })
      .then((data) => {
        console.log(data);
        setCityData(data);
        setisLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (getSearch) {
      getDataByLongandlat();
    }
  }, [search]);

  return (
    <div>
      {isLoading && (
        <>
          <h1>{cityData.name}</h1>
          <p>
            {(cityData.main.temp - 273.15).toFixed(1)}
            °C
          </p>
        </>
      )}
    </div>
  );
};

export default MainContent;
