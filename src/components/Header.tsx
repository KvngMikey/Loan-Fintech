import type { User } from "../types";

const Header = ({ user }: { user: User | null }) => {
  return (
    <header className="border-light-grey mb-10 flex h-24 items-center border bg-white px-5">
      <div>
        <p className="text-sm font-normal text-[#8b95a5]">Hello,</p>
        <p className="text-lg font-semibold text-[#041222]">
          {user?.name || "John Doe"}
        </p>
      </div>
    </header>
  );
};

export default Header;
