import { FC } from "react";
import { APP_NAME } from "constants/index";

const Footer: FC = () => (
  <footer className="flex justify-around mt-40 p-4 bg-slate-800 text-white">
    <p>
      Copyright &copy; {new Date().getFullYear()} - All right reserved by{" "}
      {APP_NAME}
    </p>
  </footer>
);

export default Footer;
