// "use client";
// import Image from "next/image";
// import React, {useState} from "react";
//
//
// type CookingStepProps = {
//     cookingSteps: { id: number; description: string }[];
// };
//
// const CookingStep: React.FC<CookingStepProps> = ({ cookingSteps }) => {
//     const [selected, setSelected] = useState<number>(1);
//     const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
//
//     const handleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };
//
//     const handleSelect = (step: number) => {
//         setSelected(step);
//         setDropdownOpen(false);
//     };
//
//     const handleIncreaseStep = () => {
//         if (selected < data.length) {
//             setSelected((prev) => prev + 1);
//             setDropdownOpen(false);
//         }
//     };
//
//     const handleDecreaseStep = () => {
//         if (selected > 1) {
//             setSelected((prev) => prev - 1);
//             setDropdownOpen(false);
//         }
//     };
//
//     const selectedStepData = data.find((item) => item.step === selected);
//
//     return (
//         <div className="w-full h-full bg-gray-300 flex justify-center items-center">
//             <div className="bg-white shadow-md rounded-lg lg:h-96 lg:w-2/3 md:h-96 md:w-2/3 h-1/2 w-[90%]">
//                 <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
//                     <div className="w-full h-full hidden lg:block md:block">
//                         <Image
//                             className="w-full h-96 p-5"
//                             width={500}
//                             height={500}
//                             alt="Cooking step"
//                             src={"/assets/images/cookingstep.png"}
//                         />
//                     </div>
//                     <div className="w-full h-full flex flex-col items-center lg:pb-5 md:pb-5">
//                         <div className="w-full flex justify-between px-2">
//                             <div></div>
//                             <Image width={25} height={25} src={"/icons/cancel.svg"} alt="Close"/>
//                         </div>
//                         <h1 className="text-secondary font-moulpali text-[30px]">
//                             ជំហានទី {selected}
//                         </h1>
//                         <Image className="w-20" width={25} height={25} src={"/icons/underline.svg"} alt="Underline"/>
//
//                         <div
//                             className="flex w-full justify-start gap-2 items-center lg:mt-2 md:mt-2 pl-5 lg:pl-0 md:pl-0">
//                             <Image width={19} height={19} src={"/icons/flower2.svg"} alt="Icon"/>
//                             <p className="text-[18px] text-secondary font-bold">របៀបធ្វើ</p>
//                         </div>
//
//                         <div className="pr-5 pt-3 pl-5 md:pl-0 text-black font-kantumruy">
//                             {selectedStepData ? selectedStepData.description : "No step found."}
//                         </div>
//
//                         <div
//                             className="flex justify-between w-full h-full items-end px-5 py-5 lg:px-0 lg:py-0 md:px-0 md:py-0">
//                             <div className="relative">
//                                 <button
//                                     onClick={handleDropdown}
//                                     className="px-3 text-black text-[15px] font-kantumruy bg-background-1 w-24 rounded h-6 flex justify-between items-center"
//                                     type="button"
//                                 >
//                                     {selected}/{data.length}
//                                     <Image width={20} height={20} src={"/icons/arrowup.svg"} alt="Dropdown"/>
//                                 </button>
//                                 {dropdownOpen && (
//                                     <div
//                                         className="absolute bottom-full z-10 bg-white rounded shadow w-24 h-32 overflow-scroll border border-primary">
//                                         <ul className="py-2 text-sm text-gray-700 flex flex-col-reverse gap-1">
//                                             {data.map((item) => (
//                                                 <li key={item.step}>
//                                                     <button
//                                                         className="text-black w-full px-2 py-1 hover:bg-background-1"
//                                                         onClick={() => handleSelect(item.step)}
//                                                     >
//                                                         {item.step}
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//
//                             <div className="flex gap-2 lg:pr-5 md:pr-5">
//                                 <button onClick={handleDecreaseStep} className="text-primary flex items-center gap-1">
//                                     <Image width={15} height={15} src={"/icons/left.svg"} alt="Previous"/>
//                                     ថយ
//                                 </button>
//                                 <p className="text-black font-thin">|</p>
//                                 <button onClick={handleIncreaseStep} className="text-primary flex items-center gap-1">
//                                     បន្ទាប់
//                                     <Image width={15} height={15} src={"/icons/right.svg"} alt="Next"/>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default CookingStep;