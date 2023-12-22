import { formatDateToLocal } from "@/utils/common";
import React, { useEffect, useRef, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const curDate = new Date();

const defaultFormData = {
  start: curDate.toISOString().split("T")[0],
  end: curDate.toISOString().split("T")[0],
  dateRange: 0,
};

const Calendar = () => {
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [range, setRange] = useState({
    startDate: curDate,
    endDate: curDate,
    key: "selection",
  });
  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const { startDate, endDate } = rangesByKey.selection;
    if (startDate && endDate) {
      setRange({ startDate, endDate, key: "selection" });
      setFormData((prev: any) => ({
        ...prev,
        start: formatDateToLocal(startDate),
        end: formatDateToLocal(endDate),
        dateRange: 0,
      }));
    }
  };
  console.log(formData);
  return (
    <div>
      <DateRange
        // ref={calendarRef}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={[range]}
        months={1}
        direction="horizontal"
        className="h-400 b_1"
        onChange={handleDateChange}
      />
    </div>
  );
};

export default Calendar;
