import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/FlightAdmin.css'
import { useNavigate } from 'react-router-dom';

const FlightAdmin = () => {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState();
  const [bookingCount, setbookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(()=>{
    fetchUserData();
  }, [])

  const fetchUserData = async () =>{
    try{
      const id = localStorage.getItem('userId');
      await axios.get(`http://localhost:6002/fetch-user/${id}`).then(
        (response)=>{
          setUserDetails(response.data);
          console.log(response.data);
        }
      )

    }catch(err){

    }
  } 


  useEffect(()=>{

    fetchData();
  }, [])

  const fetchData = async () =>{
    await axios.get('http://localhost:6002/fetch-bookings').then(
      (response)=>{
        setbookingCount(response.data.filter(booking => booking.flightName === localStorage.getItem('username')).length);
      }
    );
    await axios.get('http://localhost:6002/fetch-flights').then(
      (response)=>{
        setFlightsCount(response.data.filter(booking => booking.flightName === localStorage.getItem('username')).length);
      }
    );
  }

  return (
    <div className="flightAdmin-page">

      {userDetails ?
        <>
          {userDetails.approval === 'not-approved' ?
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. It needs an approval from the administrator. Kindly please be patience!!</p>
            </div>


          : userDetails.approval === 'rejected' ?
            <div className="notApproved-box">
              <h3>Application Rejected!!</h3>
              <p>We are sorry to inform you that your application has been rejected!!</p>
          </div>
          : userDetails.approval === 'approved' ?
            

          <div className="admin-page-cards">

          <div className="card admin-card bookings-card">
              <div className="admin-card-top bookings-bg"><span role="img" aria-label="bookings">📑</span></div>
              <div className="admin-card-bottom">
                  <h4>Bookings</h4>
                  <p>{bookingCount}</p>
                  <button className="btn btn-primary" onClick={()=>navigate('/flight-bookings')}>View all</button>
              </div>
          </div>

          <div className="card admin-card flights-card">
              <div className="admin-card-top flights-bg"><span role="img" aria-label="flights">✈️</span></div>
              <div className="admin-card-bottom">
                  <h4>Flights</h4>
                  <p>{flightsCount}</p>
                  <button className="btn btn-primary" onClick={()=>navigate('/flights')}>View all</button>
              </div>
          </div>

          <div className="card admin-card newflight-card">
              <div className="admin-card-top newflight-bg"><span role="img" aria-label="new-flight">🆕</span></div>
              <div className="admin-card-bottom">
                  <h4>New Flight</h4>
                  <p>(new route)</p>
                  <button className="btn btn-primary" onClick={()=>navigate('/new-flight')}>Add now</button>
              </div>
          </div>

      </div>

          :
            ""
          }
        </>
      :
       ""
      }

    </div>
  )
}

export default FlightAdmin