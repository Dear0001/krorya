'use client'
import Image from "next/image";
import React, {useState} from "react";

export default function CookingStep() {
    const data = [
        {
            image: "",
            stepText:"askfkas",
            step: 1,
            detail: "បន្លែ ៖ យើង ប្រើ ស្ពៃ ប្រៃ ច្រើន សម្រាប់ ស៊ុប នេះ ប៉ុន្តែ មាន អារម្មណ៍ ថា មាន សេរីភាព ក្នុង ការ ប្រើ អ្វី ដែល អ្នក មាន នៅ លើ ដៃ ។ ខ្ញុំចូលចិត្តអាំងអាំង, ការ៉ូត, celery, ដំឡូងឬដំឡូងផ្អែម, កាប, និងប៉េស. អ្នក អាច ប្ដូរ សាប៊ូ បន្លែ នេះ តាម បំណង ជាមួយ បន្លែ រដូវ ដែល អ្នក ចូលចិត្ត ! នៅ រដូវ ក្តៅ សូម បន្ថែម zucchini ឬ ពោត ស្រស់ ៗ ។ នៅ រដូវ រងារ សូម សាកល្បង បន្លែ ឫស បេះដូង ដូច ជា ប៉ារ៉ាស៊ីប ឬ បត់ ។ លទ្ធភាពគឺគ្មានទីបញ្ចប់!"
        },
        {
            image: "",
            step: 2,
            detail: "ធ្វើ ឲ្យ មូលដ្ឋាន នៃ ប្រូតេត ស្រាល របស់ យើង មាន រសជាតិ ឆ្ងាញ់ ។ បើមានប៉េងប៉ោះស្រស់ ប្រើវា! ខ្ញុំ បាន ចែក រំលែក ចំនួន ដែល អ្នក នឹង ត្រូវ ជំនួស កាំជ្រួច នៅ ក្នុង ផ្នែក យោបល់ នៃ រូប មន្ត ។"
        },
        {
            image: "",
            step: 3,
            detail: "បន្ថែម រសជាតិ ដ៏ ស្រស់ ស្អាត មួយ ទៅ សាប៊ូ របស់ យើង ។ ខ្ញុំ ស្រឡាញ់ ហ្វេនែល ជាមួយ បន្លែ ហើយ ប្រើ ដី ឬ បុក គ្រាប់ ហ្វេនែល ទាំង មូល នៅ ក្នុង សាប៊ូ នេះ ។ ស្ពៃក្តោប បន្ថែម គន្លឹះ កំដៅ (ប្រើ ច្រើន តាម ដែល អ្នក ចូល ចិត្ត សម្រាប់ កម្រិត គ្រឿង ផ្សំ ដែល អ្នក ពេញ ចិត្ត)។"
        },
        {
            image: "",
            step: 4,
            detail: "ដាំសាច់ឆ្អឹងជាការសំខាន់សម្រាប់ប្រើនៅក្នុងស៊ុប។ អ្នកអាចប្រើសាច់ឆ្អឹងមាន់ ឬសាច់ជ្រូក បន្ថែមចុងមាត់កំពឹស ដើម្បីផ្តល់នូវរសជាតិដ៏សំបូរបែប។"
        },
        {
            image: "",
            step: 5,
            detail: "សំអាតនិងកាត់ដីសាច់ឆ្អឹងរបស់អ្នកពីការប្រើប្រាស់មុន។ ប្រើជ័រដៃសំអាតសាច់ឆ្អឹងនិងសម្ងួតជាការណែនាំ។"
        },
        {
            image: "",
            step: 6,
            detail: "ដាំសាច់ឆ្អឹងរបស់អ្នកនៅក្នុងទឹកឱ្យឆ្អិនល្អ។ បន្ថែមឈើស្ករនិងខ្ទឹមសឱ្យបានល្អ សាកល្បងការចងសាច់ឆ្អឹងចំលងបរិមាណដែលអ្នកចង់បានក្នុងស៊ុប។"
        },
        {
            image: "",
            step: 7,
            detail: "ចម្លងសាច់ឆ្អឹងដែលឆ្អិនល្អរួចទៅក្នុងផ្នែកសាច់សម្រាប់ប្រើប្រាស់នៅក្នុងស៊ុប។ សម្រាប់សាច់ដែលមានរសជាតិខ្លាំង អ្នកអាចដាក់ចូលនៅក្នុងស៊ុបដោយផ្ទាល់។"
        },
        {
            image: "",
            step: 8,
            detail: "ច្របាច់មីសម្រាប់ធ្វើអាហារសម្រន់។ ធ្វើអោយដាំមីឆ្អិនល្អនៅក្នុងទឹកក្តៅ និងបន្ថែមនូវគ្រឿងទេសដើម្បីផ្តល់រសជាតិពិសារសប្បាយចិត្ត។"
        },
        {
            image: "",
            step: 9,
            detail: "ព្យាយាមចងមីសម្រាប់ធ្វើស៊ុបក្តៅ។ ប្រើមីសាច់ឆ្អិនដែលសន្សំសំចៃឆ្អិននិងមានក្លិនផ្អែម។"
        },
        {
            image: "",
            step: 10,
            detail: "ជ្រលក់បន្លែនិងសាច់ឆ្អិនក្នុងស៊ុប។ ដាំស៊ុបរបស់អ្នកឱ្យបានស្អាតចង់ឆ្ងាញ់បន្ថែមដំណឹងជាមួយនិងការចងខ្ទឹមសខ្ទឹមសាលុងស្លឹក។"
        },
        {
            image: "",
            step: 11,
            detail: "បន្ថែមគ្រាប់គោមដើម្បីផ្តល់នូវក្លិនមួយ។ គ្រាប់គោមត្រូវច្របាច់ពីដៃដើម្បីផ្តល់នូវក្លិនដែលល្អក្នុងស៊ុប។"
        },
        {
            image: "",
            step: 12,
            detail: "ការចងនិងការដាក់របស់អ្នកគឺមានចំនួនច្រើន។ បន្ថែមការទុកកន្លែងឱ្យមានផាសុខភាពកាន់តែល្អសម្រាប់ការធ្វើស៊ុបស្រួល។"
        },
        {
            image: "",
            step: 13,
            detail: "ព្យាយាមចងបន្លែនៅក្នុងស៊ុបបន្ថែម។ សម្រាប់ក្តៅក្រហមបន្ថែមត្រួយខ្ទឹមសនិងសណ្តែកក្នុងស៊ុប។"
        }
    ];




    const [selected, setSelected] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelect = (step: React.SetStateAction<number>) => {
        setSelected(step);
        setDropdownOpen(false);
    };

    const handleIncreaseStep = () => {
        if (selected < data.length) {
            setSelected(selected + 1);
            setDropdownOpen(false)
        }
    };

    const handleDecreaseStep = () => {
        if (selected > 1) {
            setSelected(selected - 1);
            setDropdownOpen(false)
        }
    };

    const selectedStepData = data.find((item) => item.step === selected);

    return (
        <div className="w-full h-full bg-gray-300 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg lg:h-96 lg:w-2/3 md:h-96 md:w-2/3 h-1/2 w-[90%]">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full hidden lg:block md:block">
                        <Image
                            className="w-full h-96 p-5"
                            width={500}
                            height={500}
                            alt="right"
                            src={"/assets/images/cookingstep.png"}
                        />
                    </div>
                    <div className="w-full h-full flex flex-col items-center lg:pb-5 md:pb-5">
                        <div className="w-full flex justify-between px-2">
                            <div></div>
                            <Image width={25} height={25} src={"/icons/cancel.svg"}     alt="right"/>
                        </div>
                        <h1 className="text-secondary font-moulpali text-[30px] justify-center">ជំហានទី{selected}</h1>
                        <Image className="w-20" width={25} height={25} src={"/icons/underline.svg"}      alt="right"/>
                        <div
                            className="flex w-full justify-start gap-2 items-center lg:mt-2 md:mt-2 pl-5 lg:pl-0 md:pl-0">
                            <Image width={19} height={19} src={"/icons/flower2.svg"}     alt="right"/>
                            <p className="text-[18px] text-secondary font-bold">របៀបធ្វើ</p>
                        </div>
                        <div className="pr-5 pt-3 pl-5 md:pl-0 ld-0 text-black font-kantumruy">
                            selectedStepData
                        </div>
                        <div
                            className="flex justify-between lg:w-full lg:h-full md:w-full md:h-full w-full h-full items-end px-5 py-5 lg:px-0 lg:py-0 md:px-0 md:py-0">
                            <div className="relative">
                                <button
                                    id="dropdownDefaultButton"
                                    onClick={handleDropdown}
                                    className={`px-3 text-black text-[15px] font-kantumruy bg-background-1 w-24 rounded h-6 flex justify-between items-center`}
                                    type="button"
                                >
                                    {selected}/{data.length}
                                    <Image className=""      alt="right" width={20} height={20} src={"/icons/arrowup.svg"}/>
                                </button>
                                {dropdownOpen && (
                                    <div
                                        className="absolute bottom-full z-10 bg-white divide-y divide-gray-100 rounded shadow w-24 dark:bg-gray-700 h-32 overflow-scroll hide-scrollbar border-[1px] border-primary">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col-reverse gap-1 bg-background-white rounded">
                                            {data.map((item) => (
                                                <li key={item.step}>
                                                    <button
                                                        className="text-black w-full px-2 py-0 hover:bg-background-1 dark:hover:bg-gray-600 dark:hover:text-black flex justify-start"
                                                        onClick={() => handleSelect(item.step)}
                                                    >
                                                        {item.step}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 lg:pr-5 md:pr-5">
                                <button onClick={handleDecreaseStep} className="text-primary flex items-center gap-1">
                                    <Image
                                        width={15}
                                        height={15}
                                        src={"/icons/left.svg"} alt="right"/>
                                    ថយ
                                </button>
                                <p className="text-black font-thin">|</p>
                                <button onClick={handleIncreaseStep} className="text-primary flex items-center gap-1">
                                    បន្ទាប់
                                    <Image
                                        width={15}
                                        height={15}
                                        src={"/icons/right.svg"}
                                        alt="right"
                                    />

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
