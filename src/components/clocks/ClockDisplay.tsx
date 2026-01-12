"use client";
import { type FC, useEffect, useMemo, useState } from "react";
import type { IConfig } from "@/lib/config/config_types";
import { AnalogClock } from "./AnalogClock";
import { DigitalClock } from "./DigitalClock";

interface IProps {
  time: Date | null;
  config: IConfig;
}

export const ClockDisplay: FC<IProps> = ({ time, config }) => {
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clockSize = useMemo(() => {
    return (
      (windowSize.width < windowSize.height
        ? windowSize.width
        : windowSize.height) * 0.8
    );
  }, [windowSize]);

  if (config.useAnalogClock && time) {
    return <AnalogClock date={time} size={clockSize} config={config} />;
  }

  return <DigitalClock time={time} config={config} />;
};
