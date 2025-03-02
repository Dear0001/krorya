import React from 'react';
import DisplayTable from "./components/DisplayTable";

const Page = () => {
    return (
        <div className={"overflow-auto scrollbar-hide"}>
            <DisplayTable/>
        </div>
    );
};

export default Page;