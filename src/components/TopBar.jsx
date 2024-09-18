import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import Menu from "./Menu";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { BgImage } from "../assets";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = React.useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {};

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>

      <Link to='/' className='flex gap-2 items-center'>
        <img src= {BgImage} className='hidden lg:flex w-14 h-14' />
        <span className='hidden lg:flex text-xl md:text-2xl text-[#065ad8] font-semibold'>
          CTU Social
        </span>
      </Link>
      {/* Mobile Menu Icon */}
      <div className='lg:hidden text-2xl absolute left-4 flex items-center'>
        <Link to='/' className='flex gap-2 items-center'>
            <img src={BgImage} className='lg:hidden w-9 h-9' />
        </Link>
        <IoIosMenu className='lg:hidden text-2xl ml-2' onClick={() => setShowMenu(!showMenu)}/>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <Menu user={user}/>
      )}

      <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-[18rem] lg:w-[38rem]  rounded-l-full py-3 '
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
        />
      </form>

      {/* ICONS */}
      <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className='hidden lg:flex'>
        <Link to={`/messages/${user._id}`}> {/* Assuming user._id holds the user ID */}
            <FaRegMessage />
          </Link>
        </div>
        <div className='hidden lg:flex'>
          <IoMdNotificationsOutline />
        </div>

        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
