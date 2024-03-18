import React, { useState, useEffect, memo } from 'react';
import { onSnapshot, collection, db } from '../../Config/Firebase';

function Header() {
    const [totalTeacher, setTotalTeacher] = useState(0);
    const [totalStudent, setTotalStudent] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "All Teachers"), (querySnapshot) => {
            setTotalTeacher(querySnapshot.size);
        });
        const unsubscribes = onSnapshot(collection(db, "All Students"), (querySnapshot) => {
            setTotalStudent(querySnapshot.size);
        });

        return () => {
            unsubscribe(); 
            unsubscribes() 
        };
    },[]);

    return (
        <div>
            <p>Total Teacher: {totalTeacher}</p>
            <p>Total Student: {totalStudent}</p>
            <p>Header</p>
        </div>
    );
}

export default memo(Header);
