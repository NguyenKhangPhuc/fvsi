import Image from "next/image";
import { getAllEvents } from "./actions/events/get/getAllEvents";

export default async function Home() {
  const { data: events, error } = await getAllEvents()

  if (error) {
    return (
      <div className="w-full flex items-center justify-center text-red-500 py-20">
        Something went wrong: {error.message}
      </div>
    )
  }
  return (
    <div></div>
  );
}
