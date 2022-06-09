import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/server">
            <a className="title" >Server side</a>
          </Link>
        </li>
        <li>
          <Link href="/client">
            <a>Client side</a>
          </Link>
        </li>
        <li>
          <Link href="/static">
            <a>Static</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
