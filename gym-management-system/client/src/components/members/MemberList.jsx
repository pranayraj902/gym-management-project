import React, { useEffect, useState } from 'react';
import { getMembers } from '../../services/memberService';
import Loader from '../common/Loader';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getMembers();
                setMembers(data);
            } catch (err) {
                setError('Failed to fetch members');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Member List</h2>
            <ul>
                {members.map(member => (
                    <li key={member.Member_id}>
                        {member.Name} - {member.Phone_Num}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberList;