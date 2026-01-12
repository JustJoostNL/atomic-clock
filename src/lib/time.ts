"use server";

const REQUEST_TIMEOUT = 5000; // 5 seconds

type TimeSource =
  | { url: string; type: "text"; parse: (text: string) => Date }
  | { url: string; type: "json"; parse: (data: { datetime: string }) => Date };

const TIME_SOURCES: TimeSource[] = [
  {
    url: "https://cloudflare.com/cdn-cgi/trace",
    type: "text",
    parse: (text: string) => {
      const match = text.match(/ts=([\d.]+)/);
      if (!match) throw new Error("Failed to parse Cloudflare time");
      return new Date(Number.parseFloat(match[1]) * 1000);
    },
  },
  {
    url: "https://worldtimeapi.org/api/ip",
    type: "json",
    parse: (data: { datetime: string }) => new Date(data.datetime),
  },
];

export async function getNetworkTime(): Promise<{
  timestamp: Date;
  time: Date;
  accuracy?: number;
}> {
  const startTime = performance.now();
  const startDate = Date.now();

  for (const source of TIME_SOURCES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(source.url, {
        signal: controller.signal,
        headers: { "Cache-Control": "no-cache" },
      });

      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const endTime = performance.now();
      const roundTripTime = endTime - startTime;

      const serverTime =
        source.type === "text"
          ? source.parse(await response.text())
          : source.parse(await response.json());

      const adjustedTime = new Date(serverTime.getTime() - roundTripTime / 2);

      return {
        timestamp: new Date(startDate + roundTripTime / 2),
        time: adjustedTime,
        accuracy: roundTripTime, // Estimated accuracy based on round-trip time
      };
    } catch {
      // Try the next source
    }
  }

  throw new Error(
    "Failed to get network time from all sources. Check your network connection.",
  );
}
