"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { getNetworkTime } from "@/lib/time";

interface ITimeSync {
  serverTime: Date;
  localTime: number;
  offset: number;
  accuracy?: number;
}

const NTP_SYNC_INTERVAL = 30 * 1000; // 30 seconds

async function fetchTime(): Promise<ITimeSync> {
  const localBeforeRequest = Date.now();
  const { time: serverTime, accuracy } = await getNetworkTime();

  const offset = serverTime.getTime() - localBeforeRequest;

  return { serverTime, localTime: localBeforeRequest, offset, accuracy };
}

export function useTime() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [syncError, setSyncError] = useState<Error | null>(null);
  const timeSyncRef = useRef<ITimeSync | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { data: timeSync, error } = useSWR("time", () => fetchTime(), {
    refreshInterval: NTP_SYNC_INTERVAL,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 1000,
    onSuccess: () => {
      setSyncError(null);
      setIsInitialized(true);
    },
    onError: (err) => {
      setSyncError(err);
      console.error("Time sync error:", err);
    },
  });

  useEffect(() => {
    if (timeSync) {
      timeSyncRef.current = timeSync;
    }
  }, [timeSync]);

  const getAccurateTime = useCallback((): Date => {
    if (!timeSyncRef.current) {
      return new Date();
    }

    return new Date(Date.now() + timeSyncRef.current.offset);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const updateTime = () => {
      setCurrentTime(getAccurateTime());
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    updateTime();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, getAccurateTime]);

  return {
    time: currentTime,
    isLoading: !timeSync && !error,
    error: syncError,
    lastSync: timeSync?.serverTime,
    accuracy: timeSync?.accuracy,
    isInitialized,
  };
}
