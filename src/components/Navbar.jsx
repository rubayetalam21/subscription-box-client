import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userImage from "../assets/user.png";
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have been successfully logged out!',
                });
            })
            .catch((error) => {

            });
    };

    const navLinkStyle = ({ isActive }) =>
        isActive
            ? 'text-teal-500 font-semibold underline'
            : 'text-gray-700 hover:underline';

    return (
        <nav className="bg-white shadow px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h2 className="font-bold text-2xl text-teal-500">HobbyHub</h2>

                {/* Desktop nav and auth section */}
                <div className="lg:flex md:flex items-center gap-6">
                    {/* Nav links */}
                    <div className="flex gap-6">
                        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                        <NavLink to="/allGroup" className={navLinkStyle}>All Group</NavLink>
                        <NavLink to="/myGroup" className={navLinkStyle}>My Group</NavLink>
                        <NavLink to="/createGroup" className={navLinkStyle}>Create Group</NavLink>
                    </div>

                    {/* Auth section */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <img
                                className="w-10 h-10 rounded-full border cursor-pointer"
                                src={user?.photoURL || userImage}
                                alt="User"
                            />
                            {user && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                    {user.displayName || "User"}
                                </div>
                            )}
                        </div>

                        {user ? (
                            <button onClick={handleLogOut} className="btn bg-teal-500 text-white px-6">
                                LogOut
                            </button>
                        ) : (
                            <Link to="/auth/login" className="btn btn-primary bg-teal-500 text-black px-6">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-2">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/allGroup" className={navLinkStyle}>All Group</NavLink>
                    <NavLink to="/myGroup" className={navLinkStyle}>My Group</NavLink>
                    <NavLink to="/createGroup" className={navLinkStyle}>Create Group</NavLink>

                    <div className="flex items-center gap-3 mt-4">
                        <img
                            className="w-10 h-10 rounded-full border"
                            src={user?.photoURL || userImage}
                            alt="User"
                        />
                        <span>{user?.displayName || "Guest"}</span>
                    </div>
                    {user ? (
                        <button onClick={handleLogOut} className="btn btn-primary w-full mt-2">
                            LogOut
                        </button>
                    ) : (
                        <Link to="/auth/login" className="btn btn-primary w-full mt-2 text-gray-900">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
