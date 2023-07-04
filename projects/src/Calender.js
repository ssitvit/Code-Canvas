import { useRef, useState } from "react";
import {
  Grid,
  Wrapper,
  HeadDays,
  DateControls,
  StyledEvent,
  SeeMore,
  PortalWrapper
} from "./Calender.styled";
import { DAYS, MOCKAPPS } from "./conts";
import {
  datesAreOnSameDay,
  getDarkColor,
  
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth
} from "./utils";

export const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 5, 28));
  const [events, setEvents] = useState(MOCKAPPS);
  
  const [showPortal, setShowPortal] = useState(false);
  const [portalData, setPortalData] = useState({});

  const addEvent = (date, event) => {
    if (!event.target.classList.contains("StyledEvent")) {
      const text = window.prompt("Event Name");
      const time=window.prompt("Start time");
      const endTime=window.prompt("End time");
      if (text && endTime && time) {
        date.setHours(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        setEvents((prev) => [
          ...prev,
          { date, title: text, time: time,endTime:endTime, color: getDarkColor() }
        ]);
      }
    }
  };

 

  

  const handleOnClickEvent = (event) => {
    setShowPortal(true);
    
  };

  const handlePotalClose = () => setShowPortal(false);

  const handleDelete = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((ev) => ev.title !== portalData.title)
    );
    handlePotalClose();
  };

  return (
    <Wrapper>
      <DateControls>
       
        <ion-icon onClick={() => prevMonth(currentDate, setCurrentDate)} name="arrow-back-outline"></ion-icon>
        {getMonthYear(currentDate)}
        <ion-icon onClick={() => nextMonth(currentDate, setCurrentDate)} name="arrow-forward-outline"></ion-icon>
      </DateControls>
      <Grid>
        {DAYS.map((day) => (
          <HeadDays className="nonDRAG">{day}</HeadDays>
        ))}
      </Grid>

      <Grid
        fullheight={true}
       
      >
        {getSortedDays(currentDate).map((day) => (
          <div
            id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
        
           
            onClick={(e) =>
              addEvent(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
          >
            <span
              className={`${
                datesAreOnSameDay(
                  new Date(),
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                )
                  ? "active"
                  : ""
              }`}
            >
              {day}
            </span>
            <EventWrapper>
              {events.map(
                (ev) =>
                  datesAreOnSameDay(
                    ev.date,
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  ) && (
                    <StyledEvent
                     
                      onClick={() => handleOnClickEvent(ev)}
                      
                      className="StyledEvent"
                      id={`${ev.color} ${ev.title} ${ev.time} ${ev.endTime}`}
                      key={ev.title}
                      time={ev.time}
                      endTime={ev.endTime}
                      bgColor={ev.color}
                    >
                     <div>Event: {ev.title }</div> 
                      <p>Start Time:{ev.time}</p>
                      <p>End Time:{ev.endTime}</p>
                    </StyledEvent>
                  )
              )}
            </EventWrapper>
          </div>
        ))}
      </Grid>
      {showPortal && (
        <Portal
          {...portalData}
          handleDelete={handleDelete}
          handlePotalClose={handlePotalClose}
        />
      )}
    </Wrapper>
  );
};

const EventWrapper = ({ children }) => {
  if (children.filter((child) => child).length)
    return (
      <>
        {children}
        {children.filter((child) => child).length > 2 && (
          <SeeMore
           
          >
            see more...
          </SeeMore>
        )}
      </>
    );
};

const Portal = ({ title, date, handleDelete, handlePotalClose }) => {
  return (
    <PortalWrapper>
      <h2>{title}</h2>
      <p>{date.toDateString()}</p>
      <ion-icon onClick={handleDelete} name="trash-outline"></ion-icon>
      <ion-icon onClick={handlePotalClose} name="close-outline"></ion-icon>
    </PortalWrapper>
  );
};


