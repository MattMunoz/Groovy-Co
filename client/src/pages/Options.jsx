import { Header } from "../Components/Header";
import { Navigate, Link } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import Balance from "../Components/Balance";
import { useUserStore } from "../Global/userState";
import FulfillIngredientOrder from "../Components/FulfillIngredientOrder";
import DisputeComplaint from "../Components/DisputeComplaint";

export default function Options() {
  const {id, role} = useUserStore();

  return id !== null ? (
    <div>
      <Header />
      { role === "Manager"}

      { role === "Importer" && <FulfillIngredientOrder />}

      { role === "Customer" &&
       <Balance />
      }
      <br />
      <div style={{ marginTop: "50px", marginLeft: "350px" }}>
        { role === "Chef" &&
          <div  >
          <Link
            className="btn"
            to={"/UpdateMenu"}
            style={{ textDecoration: "none", margin:"10px" }}
          >
            UpdateMenu
          </Link> 
          <Link
            className="btn"
            to={"/IngredientOrder"}
            style={{ textDecoration: "none", margin:"10px"  }}
          >
            Create Ingredient Order
          </Link> 
          <Link
            className="btn"
            to={"/RateFulfilledOrders"}
            style={{ textDecoration: "none", margin:"10px"  }}
          >
            Rate Fulfilled Orders
          </Link> 
          <br />
          </ div>

        }
        <DisputeComplaint />

      </div>
      {/* {role === "Chef" ? (
        <div>
          You are chef
          <Ingredients />
        </div>
      ) : (
        <div>You are not chef</div>
      )} */}

      <ToastContainer limit={3} autoClose={2000} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
