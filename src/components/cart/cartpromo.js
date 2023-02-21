import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { promos } from "../../services/custom/promos";
import Modal from "@mui/material/Modal";

const CartPromo = (props) => {
  const [open, setOpen] = useState(props.promocheck);
  const [coupons, setCoupons] = useState(promos);
  const [cost, setCost] = useState(props.cost);

  const handleClose = () => {
    setOpen(false);
    props.hidepop(false);
  };

  const applyPromo = (code) => {
    setOpen(false);
    props.hidepop(false);
    props.getpromoUpdate(code);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    border: "1px solid #ccc",
    p: 1,
    width: 600,
  };
  useEffect(() => {
    setOpen(props.promocheck);
    setCost(props.cost);
    setCoupons(promos);
    console.log(coupons);
  }, [props]);
  return (
    <Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ul className="list-unstyled">
            {coupons.map((item, index) => (
              <li className="dis flexcon" key={index}>
                <div>
                  <h6>{item.name}</h6>
                  <p>{item.discr}</p>
                </div>
                <div className="text-end">
                  <button
                    className={
                      cost <= item.mincart ? "noteligible" : "applybtn"
                    }
                    onClick={() => applyPromo(item)}
                  >
                    Apply Now
                  </button>
                  {cost <= item.mincart && (
                    <span className="text-danger text-end d-block">
                      Add {item.mincart - cost} to eligible to offer
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CartPromo;
