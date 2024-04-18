"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverSideFunction } from "@/utils/server-utils";
import { clientSideFunction } from "@/utils/client-utils";
import { useTheme } from "@/components/theme-provider";

export default function ClientRoutePage() {
  const theme = useTheme();
  const result1 = serverSideFunction();
  const result2 = clientSideFunction();
  const settings = {
    dots: true,
  };
  console.log("Client route rendered");
  return (
    <>
      <h1 style={{ color: theme.colors.primary }}>ClientRoutePage</h1>
      <p>{result1}</p>
      <p>{result2}</p>
      <div className="image-slider-container">
        <Slider {...settings}>
          <div>
            <img src="https://picsum.photos/400/200" />
          </div>
          <div>
            <img src="https://picsum.photos/400/200" />
          </div>
          <div>
            <img src="https://picsum.photos/400/200" />
          </div>
          <div>
            <img src="https://picsum.photos/400/200" />
          </div>
        </Slider>
      </div>
    </>
  );
}
