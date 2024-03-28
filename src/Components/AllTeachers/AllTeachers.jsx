import React, { memo, useEffect, useState } from 'react';
import { onSnapshot, collection, db } from '../../Config/Firebase';
import userImage from '../Images/images-removebg-preview (1).png';
import { Link } from 'react-router-dom';

function AllTeachers() {
    const [data, setData] = useState([]);
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const unsubscribe = onSnapshot(collection(db, "All Teachers"), (querySnapshot) => {
                    const teachersData = [];
                    querySnapshot.forEach((doc) => {
                        teachersData.push(doc);
                    });
                    setData(teachersData);
                     
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

    return (
        <div className="container">
            <div className="row">
                {data.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} id={teacher.id}  />
                    // console.log(teacher.id)
                ))}
            </div>
        </div>
    );
}

const TeacherCard = ({ teacher, id }) => {
    const [totalCount, setTotalCount] = useState(0);
    // console.log(id)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, teacher.data().Name), (querySnapshot) => {
                setTotalCount(querySnapshot.size);
        });
        return () => unsubscribe();
    }, [teacher]);
    let Id =(id)=>{
        console.log(id)

    }
    return (
        <div className="col-lg-6 col-md-6 col-sm-12 border py-3 px-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="border rounded-circle" style={{ width: "60px", height: "60px" }}>
                        <img src={teacher.data().Image  ? teacher.data().Image :  userImage} className='img-fluid' style={{ objectFit: 'cover' }} alt="" />
                    </div>
                    <h4 className='ps-3 text-capitalize'>Sir {teacher.data().Name}</h4>
                </div>
                <button style={{ width: '35px', height: '35px', borderRadius: '50%', border : ' none' }} id="dropdownMenuButton" data-bs-toggle="dropdown" >
                <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li className="dropdown-item" style={{cursor : 'pointer'}}>Profile</li>
                  <li className="dropdown-item" style={{cursor : 'pointer'}}>Eliminate</li>
                </ul>
            </div>
            <div className="ps-3 mt-2">
                <p className='fw-bold'>Course : {teacher.data().Courses}</p>
                <p className='fw-bold'>Total Students : { `${totalCount} are appeared` } </p>
                <div className="d-flex justify-content-between">
                <p className='fw-bold'>Timing : {teacher.data().Timming}</p>
                <p className='fw-bold'>Days : {teacher.data().Days}</p>
                </div>
                <Link to={`/teacher details?user=${id}`} className='text-capitalize text-dark fw-bold' >see more detail</Link>
            </div>
        </div>
    );
};

export default memo(AllTeachers);

 