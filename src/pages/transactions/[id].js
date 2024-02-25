"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getOneTransaction } from "@/modules/fetch/transaction";

import { useRouter } from "next/router";

export default function DashboardSidebarLayout() {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [transaction, setTransaction] = useState();
  const { id } = router.query;

  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(id);
        const response = await getOneTransaction(id);
        console.log(response.data);
        setTransaction(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, []);

  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
    initFlowbite();
  }, [pathname]);

  const Card = () => {
    return (
      <>
        <div class="w-full max-w-full bg-white border shadow-lg border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div class=" rounded-t-lg bg-gray-300 flex items-center justify-between px-10 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 gap-2 ">
                <img class="w-8 h-8 rounded-full" src={transaction?.user?.photo_url ? transaction?.user?.photo_url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Neil image" />
              </div>
              <p class="text-sm font-medium ps-5 text-gray-900 truncate dark:text-white">{transaction?.user?.name}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p class="text-lg font-medium  text-gray-900 truncate dark:text-white pe-1">No Pesanan #{transaction?.id}</p>
              <p class="text-lg font-medium  text-gray-900 truncate dark:text-white pe-1">|</p>
              <p class="text-lg font-medium  text-gray-900 truncate dark:text-white pe-1">{transaction?.transaction_status}</p>
            </div>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y my-4 px-10 divide-gray-200 dark:divide-gray-700">
              {transaction?.transaction_details?.map((item) => (
                <li class="py-3 sm:py-4">
                  <div class="flex ">
                    <div class="flex-shrink-0">
                      <img class="w-20 h-20 object-cover shadow-lg border border-gray-300" src={item?.product_variant?.product?.product_galleries[0]?.photo_url} alt="Neil image" />
                    </div>
                    <div class="flex flex-col mt-2 w-full min-w-0">
                      <p class="text-md font-medium ps-5 text-gray-900 truncate dark:text-white">{item?.product_variant?.product?.name}</p>
                      <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">
                        Variant : {item?.product_variant?.product_type?.type_name}, {item?.product_variant?.product_size?.size_name}
                      </p>
                      <p class="text-sm ps-5 text-gray-500 truncate dark:text-gray-400">x{item?.qty}</p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{item?.price && `Rp.${item.price.toLocaleString("id-ID")}`}</div>
                  </div>
                </li>
              ))}
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">Total :</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{transaction?.product_price && `Rp.${transaction?.product_price?.toLocaleString("id-ID")}`}</div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">Shipping price :</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{transaction?.shipping_price && `Rp.${transaction?.shipping_price?.toLocaleString("id-ID")}`}</div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">Shipping price :</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{transaction?.total_price && `Rp.${transaction?.total_price?.toLocaleString("id-ID")}`}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const CardAddress = () => {
    return (
      <>
        <div class="w-full max-w-full bg-white border shadow-lg border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
          <div class=" rounded-t-lg bg-gray-300 flex items-center justify-between px-10 py-4">
            <div class="flex items-center justify-center">
              <p class="text-md font-medium  text-gray-900 truncate dark:text-white pe-1">Alamat Pengiriman</p>
            </div>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y my-4 px-2 divide-gray-200 dark:divide-gray-700">
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-md font-medium ps-5 text-gray-900 truncate dark:text-white"></p>
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white"></p>
                    <p class="text-sm ps-5 text-gray-500 truncate dark:text-gray-400"></p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const CardPhoto = () => {
    return (
      <>
        <div class="w-full max-w-full bg-white border shadow-lg border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
          <div class=" rounded-t-lg bg-gray-300 flex items-center justify-between px-10 py-4">
            <div class="flex items-center justify-center">
              <p class="text-md font-medium  text-gray-900 truncate dark:text-white pe-1">Bukti Pembayaran</p>
            </div>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y my-4 px-2 divide-gray-200 dark:divide-gray-700">
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-md font-medium ps-5 text-gray-900 truncate dark:text-white"></p>
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white"></p>
                    <p class="text-sm ps-5 text-gray-500 truncate dark:text-gray-400"></p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div className=" mx-10 mt-20">
        <div className="flex md:flex-row flex-col-reverse gap-4">
          <div className=" flex flex-col gap-4">
            <CardAddress />
            <CardPhoto />
          </div>
          <div className="w-full">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
