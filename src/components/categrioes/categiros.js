import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategiorsContext } from "../../store/lists";

const Categ = () => {
  const data = useContext(CategiorsContext);

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data.clist);
    console.log(data.clist);
    console.log(data.user);
    console.log(data);
  }, [data]);
  return (
    <div className="row">
      {list.map((item, index) => (
        <div className="col-md-6" key={index}>
          <div className="row card m-2">
            <Link to={`/products?id=${item.id}`}>
              <div className="row align-items-center m-2 ">
                <div className="col-md-4">
                  <img src={item.image} alt={item.name} className="img_ca" />
                </div>
                <div className="col-md-6">
                  <p className="cattext">{item.name}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Categ;
