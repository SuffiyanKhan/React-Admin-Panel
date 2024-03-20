import React, { useState, useEffect, memo } from 'react';
import { onSnapshot, collection, db } from '../../Config/Firebase';
import AllTeachers from '../AllTeachers/AllTeachers';
import Loader from '../Loader/Loader';

function TotallTeacher() {
    const [totalCount, setTotalCount] = useState(0);
    const [loader , setLoader] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        try {
            const unsubscribe = onSnapshot(collection(db, "All Teachers"), (querySnapshot) => {
                setTotalCount(querySnapshot.size);
                setLoader(false);  
            });

            return () => {
                unsubscribe();
            };
        } catch (error) {
            console.error("Error fetching data:", error);
        } 
    };

    fetchData();
    },[]);

    return (
        <>
        {loader ? (  
                  <Loader/>
            ) : (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="mt-5 ">
                                <p className="fw-bold" >Total Teacher: {totalCount}</p>
                            </div>
                        </div>
                    </div>
                    <AllTeachers />
                 </>
            )}
        </>
    );
}

export default memo(TotallTeacher);
