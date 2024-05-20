
import React from "react";
import { DateTime } from "luxon";

const daysOfWeek = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

const formatTime = (time) => {
  return DateTime.fromISO(`1970-01-01T${time}`).toFormat("HH:mm");
};

export default function OpeningHours({ openingHours }) {
  const today = DateTime.local();
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    weekDates.push(today.plus({ days: i }));
  }

  const getDayOfWeek = (date) => {
    const dayIndex = date.weekday;
    return dayIndex === 7 ? 6 : dayIndex - 1; // Map Sunday (7) to 6 and other days to dayIndex - 1
  };

  const getFormattedDate = (date) => date.toFormat("dd.MM");

  return (
    <div className="flex flex-col w-full pb-8">
        <div className="pb-4 text-2xl uppercase">
            <h2>Nos horaires d'ouvertures</h2>
        </div>
        <div>
            {weekDates.map((date, index) => {
                const dayIndex = getDayOfWeek(date);
                const formattedDate = getFormattedDate(date);
                const specialHours = openingHours.special[formattedDate];
                const regularHours = openingHours.regular[dayIndex];

                return (
                    <div key={index}
                        className="flex flex-row"
                    >
                        <div className="w-[50px] font-semibold">
                            {daysOfWeek[index]}
                        </div>
                        {specialHours && specialHours.length > 0 ? (
                        specialHours.map((hours, idx) => (
                            <div key={idx}
                                className="pr-8"
                            >
                                {formatTime(hours.opening_time)} - {formatTime(hours.closing_time)}{" "}
                            </div>
                        ))
                        ) : regularHours && regularHours.length > 0 ? (
                        regularHours.map((hours, idx) => (
                            <div key={idx}
                                className="pr-8"
                            >
                                {formatTime(hours.opening_time)} - {formatTime(hours.closing_time)}{" "}
                            </div>
                        ))
                        ) : (
                            <div className="italic font-semibold text-red-500">
                                fermé
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
  );
};
