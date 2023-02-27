"use client";

import { partySize as partySizes, times } from "@/data";
import useAvailabilities from "@/hooks/useAvailabilities";
import { convertToDisplayTime, Time } from "@/utils";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from 'react-datepicker';

export type TTimes = typeof times;

export default function ReservationCard({ openTime, closeTime, slug }: { openTime: string; closeTime: string; slug: string }) {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(openTime);
  const [partySize, setPartySize] = useState(1);
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    setSelectedDate(null);
  };

  const filterTimeRestaurantOpenWindow = (): TTimes => {
    const timesWithinWindow: TTimes = [];
    let isWithinWindow = false;

    times.forEach((time: any) => {
      if (!isWithinWindow && time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
      return;
    });

    return timesWithinWindow;
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time: selectedTime,
      partySize
    });
  };

  return (
    <div className="absolute w-[100%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="" onChange={(e) => setPartySize(Number(e.target.value) as number)}>
          {partySizes.map(size => <option key={size.value} value={size.value}>{size.label}</option>)}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker 
            selected={selectedDate} 
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {filterTimeRestaurantOpenWindow().map(time => <option key={time.time} value={time.time}>{time.displayTime}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : 'Find a Time'}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  key={time.time}
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
};
