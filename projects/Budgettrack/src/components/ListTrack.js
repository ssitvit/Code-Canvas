import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Slide,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Delete, MoneyOff } from "@material-ui/icons";

import { ExpTrackCon } from "./Context/Context";

const useStyles = makeStyles({
  avatarInc: { backgroundColor: "navy" },
  avatarExp: { backgroundColor: "orange" },
  slide: { overflowY: "scroll" },
});

const ListTrack = () => {
  const classes = useStyles();
  const { deleteTrans, removeAll, transaction } = React.useContext(ExpTrackCon);

  return (
    <div>
      {transaction.length > 0 ? (
        <Button
          onClick={removeAll}
          variant="outlined"
          style={{ marginLeft: 170 }}
        >
          Delete All
        </Button>
      ) : null}
      <List dense={false}>
        {transaction.map((data, index) => (
          <div key={index}>
            <Slide direction="down" in mountOnEnter unmountOnExit>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    className={
                      data.type === "Income"
                        ? classes.avatarInc
                        : classes.avatarExp
                    }
                  >
                    <MoneyOff />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={data.category}
                  secondary={`$ ${data.amount} - ${data.date}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTrans(data.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Slide>
          </div>
        ))}
      </List>
    </div>
  );
};

export default ListTrack;
