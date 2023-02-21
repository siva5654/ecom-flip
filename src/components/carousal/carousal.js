import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategiorsContext } from "../../store/lists"; // import { Carousel } from "react-responsive-carousel";

const CarosalSection = () => {
  const data = useContext(CategiorsContext);
  const [categ, setCcateg] = useState(data.clist);
  useEffect(() => {
    setCcateg(data.clist);
  }, [data]);

  return (
    <div className="carousalhe">
      <ul className="list-inline">
        {categ.map((item) => (
          <li key={item.id}>
            <Link to={`/categories?name=${item.name}&id=${item.id}`}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarosalSection;
