import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, trigger } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput, FacultiesSelector, SelectInput } from "../components";
import { BgImage } from "../assets";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [availableMajors, setAvailableMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");

  // const handleNextStep = async () => {
  //   const isValid = await trigger(); // Kiểm tra validate tất cả các trường
  
  //   if (isValid) {
  //     // Nếu tất cả các trường hợp lệ, chuyển sang bước tiếp theo
  //     setCurrentStep((prevStep) => prevStep + 1);
  //   } else {
  //     // Nếu có trường không hợp lệ, hiển thị lỗi (đã được react-hook-form xử lý)
  //   }
  // };
  


  useEffect(() => {
    const majors = FacultiesSelector.getMajorsByFacultyId(selectedFaculty);
    setAvailableMajors(majors);
  }, [selectedFaculty]);

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const steps = [
    {
      title: "Thông tin cá nhân",
      content: (
          <div className='w-full flex-content flex-col lg:flex-row gap-1 md:gap-2'> 
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='firstName'
                label='Tên'
                placeholder='Tên'
                type='text'
                styles='w-full'
                register={register("firstName", {
                  required: "Tên không được để trống!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label='Họ'
                placeholder='Họ'
                type='lastName'
                styles='w-full'
                register={register("lastName", {
                  required: "Họ không được để trống!",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                  name='mssv'
                  label='Mã số sinh viên'
                  placeholder='B1234567'
                  type='text'
                  styles='w-full'
                  register={register("mssv", {
                    required: "Mã số sinh viên không được để trống!",
                  })}
                  error={errors.mssv ? errors.mssv?.message : ""}
                />
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput 
                name='birthdate'
                label='Ngày sinh'
                type='date' 
                styles='w-full'
                register={register("birthdate", {
                  required: "Ngày sinh không được để trống!"
                })}
                error={errors.birthdate ? errors.birthdate.message : ""}
              />
            </div>

          </div>
        ),
    },

    {
      title: "Thông tin đăng nhập",
      content: (
        <div className='w-full flex-content flex-col lg:flex-row gap-1 md:gap-2'> 
            
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
            <SelectInput
                label='Khoa'
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(parseInt(e.target.value, 10))}
                options={[
                  { value: "", label: "Chọn khoa" },
                  ...FacultiesSelector.getFaculties().map((faculty) => ({
                    value: faculty.id,
                    label: faculty.name,
                  })),
                ]}
                styles='w-full'
              />

              <SelectInput
                  label='Ngành'
                  value={selectedMajor} // Thêm state selectedMajor
                  onChange={(e) => setSelectedMajor(parseInt(e.target.value, 10))} // Thêm state selectedMajor
                  options={[
                    { value: "", label: "Chọn ngành" },
                    ...availableMajors.map((major) => ({
                      value: major.id,
                      label: major.name,
                    })),
                  ]}
                  styles='w-full'
                />
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='email'
                placeholder='B1234567@ctu.edu.vn'
                label='Địa chỉ Email'
                type='email'
                register={register("email", {
                  required: "Địa chỉ Email là bắt buộc!",
                  pattern: {
                    value: /^[A-Za-z0-9]+@ctu\.edu\.vn$/,
                    message: "Email phải là mail của Đại Học Cần Thơ!"
                  }
                })}
                styles='w-full'
                error={errors.email ? errors.email.message : ""}
              />
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='password'
                label='Mật khẩu'
                placeholder='Mật khẩu'
                type='password'
                styles='w-full'
                register={register("password", {
                  required: "Mật khẩu là bắt buộc!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />

              <TextInput
                label='Xác nhận mật khẩu'
                placeholder='Mật khẩu'
                type='password'
                styles='w-full'
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                      return "Mật khẩu không khớp!";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

        </div>
      ),
    },
  ];

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-1/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        <div className='w-full h-full p-10 2xl:px-20 flex flex-col justify-center '>
          <div className='w-full flex gap-2 items-center mb-6 justify-center'>
            <img src= {BgImage} className='w-14 h-14' />
            <span className='text-2xl text-[#065ad8] ' font-semibold>
              CTU Social
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold mx-auto'>
            Tạo tài khoản của bạn
          </p>

          <form
            className='py-8 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {steps[currentStep - 1].content}
            </div>

            {/* Nút điều hướng */}
            <div className="flex justify-between items-center">
              {currentStep > 1 && (
                <button onClick={handlePreviousStep}>Quay lại</button>
              )}
              {currentStep < steps.length ? (
                <button onClick={handleNextStep}>Tiếp tục</button>
              ) : (
                <div>
                <CustomButton
                  type='submit'
                  containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                  title='Tạo Tài Khoản'
                />
                </div>
              )}
            </div>
          </form>
          <p className='text-ascent-2 text-sm text-center'>
            Đã có tài khoản?{" "}
            <Link
              to='/login'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

//   return (
//     <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
//       <div className='w-full md:w-2/4 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
//         <div className='w-full h-full p-10 2xl:px-20 flex flex-col justify-center '>
//           <div className='w-full flex gap-2 items-center mb-6 justify-center'>
//             <img src= {BgImage} className='w-14 h-14' />
//             <span className='text-2xl text-[#065ad8] ' font-semibold>
//               CTU Social
//             </span>
//           </div>

//           <p className='text-ascent-1 text-base font-semibold mx-auto'>
//             Tạo tài khoản của bạn
//           </p>

//           <form
//             className='py-8 flex flex-col gap-5'
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//               <TextInput
//                 name='firstName'
//                 label='Tên'
//                 placeholder='Tên'
//                 type='text'
//                 styles='w-full'
//                 register={register("firstName", {
//                   required: "Tên không được để trống!",
//                 })}
//                 error={errors.firstName ? errors.firstName?.message : ""}
//               />

//               <TextInput
//                 label='Họ'
//                 placeholder='Họ'
//                 type='lastName'
//                 styles='w-full'
//                 register={register("lastName", {
//                   required: "Họ không được để trống!",
//                 })}
//                 error={errors.lastName ? errors.lastName?.message : ""}
//               />

//               <TextInput 
//                 name='birthdate'
//                 label='Ngày sinh'
//                 type='date' 
//                 styles='w-full'
//                 register={register("birthdate", {
//                   required: "Ngày sinh không được để trống!"
//                 })}
//                 error={errors.birthdate ? errors.birthdate.message : ""}
//               />
//             </div>

//             <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//               <TextInput
//                 name='email'
//                 placeholder='B1234567@ctu.edu.vn'
//                 label='Địa chỉ Email'
//                 type='email'
//                 register={register("email", {
//                   required: "Địa chỉ Email là bắt buộc!",
//                   pattern: {
//                     value: /^[A-Za-z0-9]+@ctu\.edu\.vn$/,
//                     message: "Email phải là mail của Đại Học Cần Thơ!"
//                   }
//                 })}
//                 styles='w-full'
//                 error={errors.email ? errors.email.message : ""}
//               />

//               <TextInput
//                   name='mssv'
//                   label='Mã số sinh viên'
//                   placeholder='B1234567'
//                   type='text'
//                   styles='w-full'
//                   register={register("mssv", {
//                     required: "Mã số sinh viên không được để trống!",
//                   })}
//                   error={errors.mssv ? errors.mssv?.message : ""}
//                 />
//             </div>

//             <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
//               <TextInput
//                 name='password'
//                 label='Mật khẩu'
//                 placeholder='Mật khẩu'
//                 type='password'
//                 styles='w-full'
//                 register={register("password", {
//                   required: "Mật khẩu là bắt buộc!",
//                 })}
//                 error={errors.password ? errors.password?.message : ""}
//               />

//               <TextInput
//                 label='Xác nhận'
//                 placeholder='Mật khẩu'
//                 type='password'
//                 styles='w-full'
//                 register={register("cPassword", {
//                   validate: (value) => {
//                     const { password } = getValues();

//                     if (password != value) {
//                       return "Mật khẩu không khớp!";
//                     }
//                   },
//                 })}
//                 error={
//                   errors.cPassword && errors.cPassword.type === "validate"
//                     ? errors.cPassword?.message
//                     : ""
//                 }
//               />

//             <SelectInput
//                 label='Khoa'
//                 value={selectedFaculty}
//                 onChange={(e) => setSelectedFaculty(parseInt(e.target.value, 10))}
//                 options={[
//                   { value: "", label: "Chọn khoa" },
//                   ...FacultiesSelector.getFaculties().map((faculty) => ({
//                     value: faculty.id,
//                     label: faculty.name,
//                   })),
//                 ]}
//                 styles='w-full'
//               />

//               <SelectInput
//                   label='Ngành'
//                   value={selectedMajor} // Thêm state selectedMajor
//                   onChange={(e) => setSelectedMajor(parseInt(e.target.value, 10))} // Thêm state selectedMajor
//                   options={[
//                     { value: "", label: "Chọn ngành" },
//                     ...availableMajors.map((major) => ({
//                       value: major.id,
//                       label: major.name,
//                     })),
//                   ]}
//                   styles='w-full'
//                 />
//             </div>

//             {errMsg?.message && (
//               <span
//                 className={`text-sm ${
//                   errMsg?.status == "failed"
//                     ? "text-[#f64949fe]"
//                     : "text-[#2ba150fe]"
//                 } mt-0.5`}
//               >
//                 {errMsg?.message}
//               </span>
//             )}

//             {isSubmitting ? (
//               <Loading />
//             ) : (
//               <CustomButton
//                 type='submit'
//                 containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
//                 title='Tạo Tài Khoản'
//               />
//             )}
//           </form>

//           <p className='text-ascent-2 text-sm text-center'>
//             Đã có tài khoản?{" "}
//             <Link
//               to='/login'
//               className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
//             >
//               Đăng nhập
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Register;
