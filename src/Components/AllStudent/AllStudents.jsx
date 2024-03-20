import React, { memo, useEffect, useState } from 'react';
import { onSnapshot, collection, db } from '../../Config/Firebase';
import AllStudentsRender from '../AllStudentsRender/AllStudentsRender';
import Loader from '../Loader/Loader'
function AllStudents() {
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true); // Step 1: Introduce loading state

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "All Students"), (querySnapshot) => {
            setTotalCount(querySnapshot.size);
            setLoading(false); // Step 3: Turn off loading once data arrives
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="mt-5 ">
                        {loading ?  
                          <Loader />
                         : (
                            <p className="fw-bold text-capitalize">Total Students: {totalCount}</p>
                        )}
                    </div>
                </div>
            </div>
            {loading ? null : <AllStudentsRender />} {/* Step 2: Render data once not loading */}
        </>
    )
}

export default memo(AllStudents);
