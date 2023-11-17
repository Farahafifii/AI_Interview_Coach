import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Spinner from "../components/Spinner";
import {sendAnswerToGPT} from '../features/guest/guestSlice'

function Login() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    questionType : "",
    notes : ""
  });

  const { jobTitle,questionType , notes } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSuccess && user) {
  //     if (user.role === "Admin") navigate("/admin/home");
  //     else if (user.role === "Instructor") {
  //       if (user.Accepted === false) {
  //         navigate("/instructor/acceptContract");
  //       } else {
  //         navigate("/instructor/home");
  //       }
  //     } else if (user.role === "Individual Trainee")
  //       if (user.PaymentPolicyAccepted === false) {
  //         navigate("/individualTrainee/acceptPolicy");
  //       } else {
  //         navigate("/individualTrainee/home");
  //       }
  //     else if (user.role === "Corporate Trainee")
  //       navigate("/CorporateTrainee/home");
  //     else navigate("/");
  //   }

  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(sendAnswerToGPT(formData));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
    <div class="box-form">
      <section className="center">
        <h1>
          <FaUser /> Login
        </h1>
        <p className="p1">Please Login to your account</p>
      </section>
      <section className="center">
        <form onSubmit={onSubmit}>
          <div >
            <input
              type="text"
              className="inputs"
              id="username"
              name="username"
              value={jobTitle}
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div >
            <input
              type="password"
              className="inputs"
              id="password"
              name="password"
              value={questionType}
              placeholder="Password"
              onChange={onChange}
            />
          </div>

          <div className="center">

        
            <button type="submit">
              LogIn
            </button>
            <p className="p2" style={{fontSize:'14px'}}>-------------------- Don't have an account? --------------------</p>
            <br/>
            <button className="btnGuest" onClick={() => navigate("/register")}>
        Register
         </button>
         <br/>
           
          </div>
        </form>
      </section>
      <div className='right'>
      <li className='linkToRegister'>
                <Link to='/guest/acceptPolicy'>
                     Continue as a Guest
                </Link>
            </li>
            </div>
 <div>

</div>
    </div>
    
    </>
  );
}

export default Login;


{/* <button className="btn" onClick={() => navigate("/guest/acceptPolicy")}> */}

{/* <button className="btn" onClick={() => navigate("/guest/acceptPolicy")}>
        Continue as guest
      </button> */}