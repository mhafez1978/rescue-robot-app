import Link from "next/link";
const Footer = () => {
  return (
    <footer className="flex flex-row bg-slate-400 items-center justify-between py-2 px-2">
      <div className="logoContainer flex flex-col">
        <h1 className="text-lg font-black">Rescue Robot</h1>
        <p className="text-xs ">
          <em>Your super hero rescue robot ...</em>
        </p>
      </div>

      <ul className="flex flex-row text-xs uppercase text-slate-800">
        <li className="mr-4">
          <Link href="/">Home</Link>
        </li>
        <li className="mr-4">
          <Link href="/">About</Link>
        </li>
        <li className="">
          <Link href="/">Contact</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
