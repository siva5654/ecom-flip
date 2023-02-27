import React from "react";
import { useContext, useEffect, useState } from "react";
import { CategiorsContext } from "../../store/lists";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import UseFetch from "../../services/custom/fetchdata";
import { GetProducts } from "../../services/api";
import { useSearchParams } from "react-router-dom";

const Filters = (props) => {
  const [serchParasm] = useSearchParams();
  const param = serchParasm.get("id");
  const [data] = UseFetch(GetProducts + `/?categoryId=${param}`);

  const products = useContext(CategiorsContext);
  const [filters, setFilters] = useState(products.clist);
  const [value, setValue] = useState([0, 5000]);
  const [items, setItmes] = useState(data);
  //   const [newIt, setNewit] = useState([]);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    const newdata = data.filter(
      (item, index) => item.price >= value[0] && item.price <= value[1]
    );
    setItmes(newdata);
    console.log(items);
    props.getupdate(items);
  };
  useEffect(() => {
    setFilters(products.clist);
    props.getupdate(data);

    // setItmes(props.pros);
  }, [products, data, props]);

  return (
    <div>
      <div className="border">
        <div className="pricerange m-4">
          <Typography id="range-slider" gutterBottom>
            Select Price Range:
          </Typography>
          <Slider
            value={value}
            min={0}
            step={1}
            max={3000}
            onChange={rangeSelector}
            valueLabelDisplay="auto"
          />
          Your range of Price is between {value[0]} /- and {value[1]} /-
        </div>
      </div>
      {filters && (
        <div className="border">
          <ul className="list-unstyled m-4 ">
            {filters.map((item, index) => (
              <li key={index} className="form-check">
                <input
                  type="checkbox"
                  id={index}
                  name={item.name}
                  data_attr={item.id}
                  className="form-check-input"
                />
                <label
                  className=" cp form-check-label"
                  for={index}
                  aria-label={item.name}
                >
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filters;
