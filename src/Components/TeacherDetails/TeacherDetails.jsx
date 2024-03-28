import React, { memo, useEffect, useState } from 'react';
import { collection, db, getDocs, query, where, onSnapshot  } from '../../Config/Firebase';
import image from '../Images/images-removebg-preview (1).png' 
function TeacherDetails() {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentCollection , setStudentCollection] = useState('')
  const [totalStudent , setTotalStudent] = useState('')
  const [allData ,setAllData] = useState([])
  const [alertData , setAlertData] = useState(false)
  useEffect(() => {
    try {
        let totalStudents = async () => {
            const q = query(collection(db, studentCollection));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentData = [];
      setTotalStudent(querySnapshot.size)
      querySnapshot.forEach((doc) => {
        studentData.push(doc.data());
      });
      setAllData(studentData)
     });
        }
        totalStudents()
    } catch (error) {
        console.error(error)
    }
    
}, []);
const fetchData = async () => {
  try {
    const URLParams = new URLSearchParams(window.location.search);
    const userID = URLParams.get("user");
    const q = query(collection(db, "All Teachers"), where("UserId", "==", userID));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (querySnapshot.empty) {
      setError("No matching documents.");
      setLoading(false);
      return;
    }
    setLoading(false);
    setTeacherData( doc.data());
    setStudentCollection(doc.data().Name)
     
    });
   
  } catch (error) {
    setError("Error fetching data: " + error.message);
    setLoading(false);
  }
};

fetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teacherData) {
    return <div>No data found for this teacher.</div>;
  }
   
  return (
    <>
    <div className="container-fluid">
        <div className="row px-3 mt-3">
            <div className="col-lg-4 col-md-4 col-sm-12 border border-dark rounded py-2" style={{
                height : "500px"
            }} >
                <div className=' d-flex justify-content-center '>
                    <img src={image} className='img-fluid border rounded-circle' alt="" />
                </div>
                <div className="mt-3">
                <p className='text-capitalize fw-semibold h5 ' >{teacherData.Name  ? `sir ${teacherData.Name}` : ""}</p>
                <p className='text-Lowercase fw-semibold  ' >{teacherData.Email  ? `${teacherData.Email}` : ""}</p>
                <p className='text-capitalize fw-semibold  ' >{teacherData.Phone_Number  ? `Contact number :  ${teacherData.Phone_Number}` : ""}</p>
                <p className='text-capitalize fw-semibold  ' >{teacherData.Courses  ? ` Course :  ${teacherData.Courses}` : ""}</p>
                <p className='text-capitalize fw-semibold  ' >{teacherData.Timming  ? `Class timing : ${teacherData.Timming}` : ""}</p>
                <p className='text-capitalize fw-semibold  ' >{teacherData.Days  ? `Days :  ${teacherData.Days}` : ""}</p>
                </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12" >
                <p>Total students : {totalStudent} are apeared in this course</p>
                {
                    allData.map((data) =>  (
                        <div className="border  rounded shadow-sm px-3"style={{ height : "250px"}}>

                    <div className="d-flex align-items-center " style={{width : "60px"}}>
                        <img src={data.Studentimage_url ? data.Studentimage_url : image} className='img-fluid border rounded-circle' alt="" />
                    <div className="ms-3 p-0" >
                    <p className='p-0 text-capitalize fw-bold mt-4'> {data.StudentName}</p>
                    <p className='p-0' style={{position : 'relative' , bottom : '18px'}}>{data.StudentEmail}</p>
                    </div>
                    </div>
                <div className="d-flex align-items-center">
                </div>
                <div className="px-4">
                <p className='text-capitalize fw-semibold'>Course : {data.StudentCourse}</p>
                <p className='text-capitalize fw-semibold'>Trainer : {data.TeacherName}</p>
                <div className="d-flex  justify-content-between">
                <p className='text-capitalize fw-semibold'>Timinig :{data.Timming}</p>
                <p className='text-capitalize fw-semibold'>Days :  {data.Days}</p>
                </div>
                </div>
                </div>
                    )
                    )
                }
            </div>
        </div>
    </div>
    </>
  );
}

export default memo(TeacherDetails);






// import React, { useEffect, useState } from 'react';
// import { collection, db, getDocs, query, where, onSnapshot } from '../../Config/Firebase';
// import image from '../Images/images-removebg-preview (1).png';

// function TeacherDetails() {
//   const [teacherData, setTeacherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [studentCollection, setStudentCollection] = useState('');
//   const [totalStudent, setTotalStudent] = useState('');
//   const [allData, setAllData] = useState([]);
//   const [alerrtData , setAlertData] = useState(false)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const URLParams = new URLSearchParams(window.location.search);
//         const userID = URLParams.get("user");
//         const q = query(collection(db, "All Teachers"), where("UserId", "==", userID));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//           setError("No matching documents.");
//           setLoading(false);
//           return;
//         }

//         querySnapshot.forEach((doc) => {
//           setTeacherData(doc.data());
//           setStudentCollection(doc.data().Name);
//         });

//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data: " + error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
    
//   }, []);

//   useEffect(() => {
//     const totalStudents = async () => {
//       const q = query(collection(db, studentCollection));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const studentData = [];
//         setTotalStudent(querySnapshot.size);
//         querySnapshot.forEach((doc) => {
//           studentData.push(doc.data());
//         });
//         setAllData(studentData);
//       });
//     };

//     if (studentCollection) {
//       totalStudents();
//     }
    
//   if (allData.length === 0) {
//     // return setAlertData(true)
//     return <div>No student data available for this teacher.</div>;
//   }

//   }, [studentCollection]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!teacherData) {
//     return <div>No data found for this teacher.</div>;
//   }

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row px-3 mt-3">
//           <div className="col-lg-4 col-md-4 col-sm-12 border border-dark rounded py-2" style={{ height: "500px" }}>
//             <div className='d-flex justify-content-center'>
//               <img src={image} className='img-fluid border rounded-circle' alt="" />
//             </div>
//             <div className="mt-3">
//               <p className='text-capitalize fw-semibold h5'> {teacherData.Name ? `sir ${teacherData.Name}` : ""}</p>
//               <p className='text-Lowercase fw-semibold'> {teacherData.Email ? `${teacherData.Email}` : ""}</p>
//               <p className='text-capitalize fw-semibold'> {teacherData.Phone_Number ? `Contact number :  ${teacherData.Phone_Number}` : ""}</p>
//               <p className='text-capitalize fw-semibold'> {teacherData.Courses ? ` Course :  ${teacherData.Courses}` : ""}</p>
//               <p className='text-capitalize fw-semibold'> {teacherData.Timming ? `Class timing : ${teacherData.Timming}` : ""}</p>
//               <p className='text-capitalize fw-semibold'> {teacherData.Days ? `Days :  ${teacherData.Days}` : ""}</p>
//             </div>
//           </div>
//           <div className="col-lg-8 col-md-8 col-sm-12">
//             <p>Total students: {totalStudent} are appeared in this course</p>
//             { alerrtData ? "data not found" :
//             allData.map((data, index) => (
//               <div key={index} className="border rounded shadow-sm px-3" style={{ height: "250px" }}>
//                 <div className="d-flex align-items-center " style={{ width: "60px" }}>
//                   <img src={data.Studentimage_url ? data.Studentimage_url : image} className='img-fluid border rounded-circle' alt="" />
//                   <div className="ms-3 p-0" >
//                     <p className='p-0 text-capitalize fw-bold mt-4'> {data.StudentName}</p>
//                     <p className='p-0' style={{ position: 'relative', bottom: '18px' }}>{data.StudentEmail}</p>
//                   </div>
//                 </div>
//                 <div className="px-4">
//                   <p className='text-capitalize fw-semibold'>Course: {data.StudentCourse}</p>
//                   <p className='text-capitalize fw-semibold'>Trainer: {data.TeacherName}</p>
//                   <div className="d-flex  justify-content-between">
//                     <p className='text-capitalize fw-semibold'>Timinig: {data.Timming}</p>
//                     <p className='text-capitalize fw-semibold'>Days:  {data.Days}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//             }
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default TeacherDetails;
 