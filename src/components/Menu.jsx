import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import { BsPersonFillAdd } from "react-icons/bs";
import moment from "moment";

import { UpdateProfile } from "../redux/userSlice";

const Menu = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="lg:hidden absolute top-12 left-4 bg-white border border-gray-300 rounded-md shadow-md">
        <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 flex items-center">
            <Link to={`/profile/${user._id}`}>Profile</Link>
            <div className='ml-5'>
            {user?._id === data?._id ? (
                <LiaEditSolid
                size={22}
                className='text-blue cursor-pointer'
                onClick={() => dispatch(UpdateProfile(true))}
                />
            ) : (
                <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => {}}
                >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                </button>
            )}
            </div>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/notifications">Notifications</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/messages/${user._id}">Messages</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/groups">Groups</Link>
        </li>
        </ul>
    </div>
  );
};

export default Menu;
