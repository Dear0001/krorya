import Image from "next/image";
const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }: any) => (
    <div className="lg:justify-center lg:py-1 flex lg:items-center gap-5 rounded-md border border-gray-300 text-sm px-7 text-center h-1/2">
        <Image src="/icons/search.svg" alt="Search Icon" width={15} height={15} />
        <input
            id="text"
            type="text"
            className="border-none focus:outline-none focus:border-none focus:ring-0 border-b-gray-300 p-3"
            placeholder="ស្វែងរក"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
);

export default SearchBar;
