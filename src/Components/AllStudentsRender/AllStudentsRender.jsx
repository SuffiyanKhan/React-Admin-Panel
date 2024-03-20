import React, { memo ,useEffect, useState } from 'react'
import { onSnapshot, collection, db } from '../../Config/Firebase';
import defaultImage from '../Images/images-removebg-preview (1).png'


function AllStudentsRender() {
    const [allStudentDat , setAllStudentData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const unsubscribe = onSnapshot(collection(db, "All Students"), (querySnapshot) => {
                    const teachersData = [];
                    querySnapshot.forEach((doc) => {
                        teachersData.push(doc);
                    });
                    setAllStudentData(teachersData)                     
                });

                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        };

        fetchData();
    }, []);

    let eliminated =(id)=>{
        console.log(id)
    }
  return (
    <>
        <div className="container">
            <div className="row">
                {
                    allStudentDat.map((studentsData) =>
                    // {
                    //     console.log(studentsData.id)
                    // }
                    (
                        <div className="col-lg-6 col-md-12 col-sm-12 rounded border" key={studentsData.id}>
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <div className="d-flex align-items-center">
                        <div className="border rounded-circle" style={{width : "50px" , height : "50px"}}>
                            <img src={studentsData.data().image_URL ? studentsData.data().image_URL :  defaultImage} className='img-fluid rounded-circle'  alt="" />
                        </div>
                        <div className="">
                        <h5 className='ms-3 text-capitalize fw-bold'>{studentsData.data().Name}</h5>
                        <h6 className='ms-3 '>{studentsData.data().Email}</h6>
                        </div>
                        </div>
                        <button style={{ width: '35px', height: '35px', borderRadius: '50%', border : ' none' }} id="dropdownMenuButton" data-bs-toggle="dropdown" >
                <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li className="dropdown-item" style={{cursor : 'pointer'}}  onClick={()=> eliminated(studentsData.id)}>Eliminate</li>
                </ul>
                </div>
                <div className="ps-4">
                    <p className='text-capitalize fw-semibold'>{`Course : ${studentsData.data().Courses}`}</p>
                    <div className="d-flex justify-content-between align-items-center">
                    <p className='text-capitalize fw-semibold'>{`Qualification : ${studentsData.data().Qualification}`}</p>
                    <p className='fw-semibold'>{studentsData.data() ? (<div className='border rounded-pill px-3'>
                        <p className=' mt-1' >enrolled</p>
                    </div>) : (<div className='border rounded-pill px-3'>
                        <p className=' mt-1' >eliminated</p>
                    </div>)}</p>
                    </div>
                </div>
                </div>
                    )
                    )
                }
            </div>
        </div>
    </>
  )
}

export default memo(AllStudentsRender)