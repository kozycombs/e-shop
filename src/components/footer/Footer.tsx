import { FC } from "react";

const Footer: FC = () => (
  <footer className="flex justify-around p-4 bg-slate-800 text-white">
    <p>
      Copyright &copy; {new Date().getFullYear()} - All right reserved by
      KozyDev
    </p>
  </footer>
);

export default Footer;
