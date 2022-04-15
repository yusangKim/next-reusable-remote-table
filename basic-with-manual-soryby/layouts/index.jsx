import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="bg-yellow-200 p-4">
        <ul className="flex">
          <li className="mr-6">
            <Link href="/">
              <a className="text-yellow-700 hover:text-yellow-800">Home</a>
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/todo-list">
              <a className="text-yellow-700 hover:text-yellow-800">TodoList</a>
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/todo-widget">
              <a className="text-yellow-700 hover:text-yellow-800">
                TodoList Widget
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
