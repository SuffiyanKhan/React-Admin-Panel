import React, { useState, useEffect, memo } from 'react';
import { onSnapshot, collection, db } from '../../Config/Firebase';
import AllTeachers from '../AllTeachers/AllTeachers';

function TotallTeacher() {
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "All Teachers"), (querySnapshot) => {
            setTotalCount(querySnapshot.size);
        });

        return () => {
            unsubscribe();  
        };
    },[]);

    return (
        <>
        <div className="container">
          <div className="row">
            <div className="mt-5 ">
              <p className="fw-bold" >Total Teacher: {totalCount}</p>
            </div>
          </div>
        </div>
        <AllTeachers/>
            <p>Total Teacher</p>
        </>
    );
}

export default memo(TotallTeacher);
