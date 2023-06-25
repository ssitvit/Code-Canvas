import React from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import { useSpeechContext } from "@speechly/react-client";
import { v4 as uuid } from "uuid";
import { ExpTrackCon } from "./Context/Context";
import { incomeCategories, expenseCategories } from "../Constants/categories";

import formatDate from "../Utils/formatDate";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const [formData, setFormData] = React.useState(initialState);

  const { addTrans } = React.useContext(ExpTrackCon);
  const { segment } = useSpeechContext();

  const createTrans = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
    
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuid(),
    };

    addTrans(transaction);
    setFormData(initialState);
  };

  React.useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        return setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        return setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTrans();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;

        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;

          case "category":
            if (incomeCategories.map((ic) => ic.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((ic) => ic.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;

          case "date":
            setFormData({ ...formData, date: e.value });
            break;

          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.date &&
        formData.type
      ) {
        createTrans();
      }
    }
  }, [segment]);

  const selectedCat =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography style={{ margin: 20 }}>
            {segment ? (
              <div className="speech">
                <h1>{segment.words.map((w) => w.value).join(" ")}</h1>
              </div>
            ) : (
              <div className="titleSpeech">
                <h1>Hold to Talk...</h1>
              </div>
            )}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {selectedCat.map((cat, index) => (
                <MenuItem key={index} value={cat.type}>
                  {cat.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="number"
            fullWidth
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            label="date"
            fullWidth
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: formatDate(e.target.value) })
            }
          />
        </Grid>
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: 20, color: "#fff", backgroundColor: "#D864A9" }}
          onClick={createTrans}
        >
          Track
        </Button>
      </Grid>
    </div>
  );
};

export default Form;
