import React from "react";
import "./Home.scss";
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from "@speechly/react-ui";
import CardExp from "../components/CardExp";
import CardTrack from "../components/CardTrack";

export default function Home() {
  return (
    <section className="ionic-page">
      <section>
        <div className="ionic-head">
          <h1>Expense Tracker</h1>
        </div>
      </section>
      <section className="ionic-bg">
        <div className="ionic-expense">
          <div className="income">
            <CardExp title="Income" />
          </div>
          <div className="expenseTrack">
            <CardTrack title="Expense Tracker" />
          </div>
          <div className="expense">
            <CardExp title="Expense" />
          </div>
        </div>
      </section>
      <section>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      </section>
    </section>
  );
}
