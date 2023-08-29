import React from "react";
import "./CardExp.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

import { Doughnut } from "react-chartjs-2";
import useTransaction from "../useTransaction";

const useStyles = makeStyles({
  parent: { marginTop: 40 },
  bullet: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  income: {
    width: 300,
    height: 400,
    borderBottomWidth: 5,
    borderBottomColor: "navy",
  },
  expense: {
    width: 300,
    height: 400,
    borderBottomWidth: 5,
    borderBottomColor: "orange",
  },
});

const CardExp = (props) => {
  const classes = useStyles();
  const { total, chartData } = useTransaction(props.title);

  return (
    <div className={classes.parent}>
      <Card
        className={props.title === "Income" ? classes.income : classes.expense}
        variant="outlined"
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.title}
          </Typography>

          <Typography>$ {total}</Typography>

          <Doughnut
            data={chartData}
            width={100}
            height={80}
            options={{ maintainAspectRatio: true }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardExp;
