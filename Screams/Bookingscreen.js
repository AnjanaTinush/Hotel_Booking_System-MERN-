import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration :2000
});
 

function Bookingscreen(){

  const [loading,setloading]=useState(true);
  const [error,seterror]=useState();
  const [room,setroom]=useState();

  const {roomid,fromdate,todate}=useParams()

  const fromDateObj=moment(fromdate,'DD-MM-YYYY')
  const toDateObj=moment(todate,'DD-MM-YYYY')

  const totaldays = moment.duration(toDateObj.diff(fromDateObj)).asDays() +1

  const [totalamount, settotalamount] = useState()


 const fetchData = async () =>{

  if(!localStorage.getItem('currentUser')){
    window.location.reload='/login'
  }
  
  try {

    setloading(true);
    const data=(await axios.post("/api/rooms/getroombyid",{roomid:roomid})).data;
    settotalamount(data.rentperday * totaldays)

    setroom(data)
    setloading(false)

  } catch (error) {
    setloading(false)
    seterror(true)
    
  }
 }

 useEffect(() =>{

  fetchData();

 },[]);


async function onToken(token) {
  console.log(token);

  const bookingDetails ={
    room,
    userid:JSON.stringify(localStorage.getItem('currentUser'))._id,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token
    
   }

   try {
    setloading(true)
    const result =await axios.post('/api/bookings/bookroom' ,bookingDetails)
    setloading(false)
    Swal.fire('Congratulations' ,'Your Room Booked Successfully' , 'success').then(result=>{
      window.location.href='/bookings'
    })
   } catch (error) {
    setloading(false)
    Swal.fire('OOps' ,'Something went wrong' , 'error')

   }
   
}
 
  return (
    <div className='m-5' data-aos='flip-left'>
      {loading ? (<h1><Loader/></h1>) : room ? (<div>
       
       <div className="row justify-content-center mt-5 bs">

         <div className="col-md-6">
          <h1>{room.name}</h1>
            <img src={room.imageurls[0] }className="bigimg"/>
          </div>

          <div className="col-md-6">

             <div style={{textAlign :"right"}}>
             <b> <h1>Booking Details</h1></b>
              <hr/>

             
                <p>Name :{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                <p>From Date :{fromdate}</p>
                <p>To Date :{todate}</p>
                <p>Max Count :{room.maxcount}</p>
              
             </div>

             <div style={{textAlign :"right"}}>
              
             <b> <h1>Amount</h1></b>
              <hr/>
              <p>Total days :{totaldays}</p>
              <p>Rent per day :{room.rentperday}</p>
              <b> <p>Total Amount :{totalamount}</p> </b>
             
             </div>

            <div style={{float :"right"}}>

             
              <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="LKR"
                  stripeKey="pk_test_51OXynSCCoPwlVU882PYPcQm7NFYlPF6F0k1hqZDp9u0wifghpamdksTSzcE63apMNQyN136EujQRGgI7RcwGYOE500ICWCZHFK"
                >
                  
                  <button className='btn btn-primary' >Pay Now</button>


                </StripeCheckout>
              
            </div>

          </div>
        
       </div>

      </div>) :<Error/>}
    </div>
  )
}

export default Bookingscreen;