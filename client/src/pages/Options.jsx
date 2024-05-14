import { Header } from "../Components/Header";
import { DeleteAccount } from "../Components/DeleteAccount";
import { Navigate, Link } from "react-router-dom";
import Balance from "../Components/Balance";
import { useUserStore } from "../Global/userState";
import FulfillIngredientOrder from "../Components/FulfillIngredientOrder";
import DisputeComplaint from "../Components/DisputeComplaint";
import HandleComplaints from "../Components/HandleComplaints";
import { OpenOrders } from "../Components/OpenOrders";

export default function Options() {
  const { id, role } = useUserStore();

  console.log(role);

  return id !== null ? (
    <div>
      <Header />
      {role === "Manager" && <HandleComplaints />}

      {role === "Importer" && <FulfillIngredientOrder />}

      {role === "Deliverer" && <OpenOrders />}

      {role === "Customer" && 
      <>
        <Balance />
        <Link
              className="btn"
              to={"/RateFulfilledOrders"}
              style={{ textDecoration: "none", margin: "10px" }}
            >
              Rate Fulfilled Orders
            </Link>
      </>}

      <br />
      <div style={{ marginTop: "50px", marginLeft: "350px" }}>
        {role === "Chef" && (
          <div>
            <Link
              className="btn"
              to={"/UpdateMenu"}
              style={{ textDecoration: "none", margin: "10px" }}
            >
              UpdateMenu
            </Link>
            <Link
              className="btn"
              to={"/IngredientOrder"}
              style={{ textDecoration: "none", margin: "10px" }}
            >
              Create Ingredient Order
            </Link>
            <Link
              className="btn"
              to={"/RateFulfilledOrders"}
              style={{ textDecoration: "none", margin: "10px" }}
            >
              Rate Fulfilled Orders
            </Link>
            <br />
          </div>
        )}
        <DisputeComplaint />
      </div>
      <DisputeComplaint />
      {/* {role === "Chef" ? (
        <div>
          You are chef
          <Ingredients />
        </div>
      ) : (
        <div>You are not chef</div>
      )} */}

      <DeleteAccount />

    </div>
  ) : (
    <Navigate to="/login" />
  );
}
