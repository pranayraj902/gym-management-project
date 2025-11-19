import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createMember, updateMember, getMemberById } from '../../services/memberService';

const MemberForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const [member, setMember] = useState({
        Member_id: '',
        Name: '',
        Gender: '',
        Phone_Num: '',
        Address: '',
        Join_Date: new Date().toISOString().split('T')[0],
        membership_expiry: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const fetchMember = async () => {
                const data = await getMemberById(id);
                setMember(data);
            };
            fetchMember();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateMember(member);
        } else {
            await createMember(member);
        }
        history.push('/members');
    };

    return (
        <div className="member-form">
            <h2>{isEditing ? 'Edit Member' : 'Add Member'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="Name" value={member.Name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="Gender" value={member.Gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="Phone_Num" value={member.Phone_Num} onChange={handleChange} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" name="Address" value={member.Address} onChange={handleChange} />
                </div>
                <div>
                    <label>Join Date:</label>
                    <input type="date" name="Join_Date" value={member.Join_Date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Membership Expiry:</label>
                    <input type="date" name="membership_expiry" value={member.membership_expiry} onChange={handleChange} />
                </div>
                <button type="submit">{isEditing ? 'Update Member' : 'Add Member'}</button>
            </form>
        </div>
    );
};

export default MemberForm;