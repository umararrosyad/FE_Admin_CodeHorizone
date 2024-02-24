"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import Products from "@/layout/products";
import Categories from "@/layout/categories";
import Dashboard from "@/layout/dashboard";
import Werehouse from "@/layout/werehouse";

import { useRouter } from "next/router";

export default function DashboardSidebarLayout({ children }) {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);

  useEffect(() => {
    if (location === "dashboard") {
      router.push("/dashboard");
    } else if (location === "products") {
      router.push("/dashboard/products");
    } else if (location === "categories") {
      router.push("/dashboard/categories");
    } else if (location === "werehouse") {
      router.push("/dashboard/werehouses");
    }
    initFlowbite();
  }, [location]);

  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
    initFlowbite();
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <Sidebar location={location} />
      <div className=" sm:ml-64 mt-16">
        <Werehouse />
      </div>
    </div>
  );
}
