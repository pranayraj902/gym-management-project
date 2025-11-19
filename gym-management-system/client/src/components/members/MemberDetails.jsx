import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import memberService from '../../services/memberService';
import Loader from '../common/Loader';

const MemberDetails = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                const response = await memberService.getMemberById(id);
                setMember(response.data);
            } catch (err) {
                setError('Error fetching member details');
            } finally {
                setLoading(false);
            }
        };

        fetchMemberDetails();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="member-details">
            <h2>Member Details</h2>
            <p><strong>Name:</strong> {member.name}</p>
            <p><strong>Gender:</strong> {member.gender}</p>
            <p><strong>Phone Number:</strong> {member.phone_Num}</p>
            <p><strong>Address:</strong> {member.address}</p>
            <p><strong>Join Date:</strong> {new Date(member.join_Date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {member.status}</p>
            <p><strong>Membership Expiry:</strong> {member.membership_expiry ? new Date(member.membership_expiry).toLocaleDateString() : 'N/A'}</p>
        </div>
    );
};

export default MemberDetails;