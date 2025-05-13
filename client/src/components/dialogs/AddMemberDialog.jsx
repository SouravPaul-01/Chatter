import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((member) => member !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  const closeHandler = () => {
    console.log("closeHandler");
    setSelectedMembers([]);
    setMembers([]);
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack spacing={"1rem"} padding={"1rem"} width={"23rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack>
          {members.length > 0 ? (
            members.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography variant="body1" textAlign={"center"}>
              No Users
            </Typography>
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button color="error" onClick={closeHandler} variant="contained">
            Cancel
          </Button>
          <Button
            disabled={isLoadingAddMember}
            onClick={addMemberSubmitHandler}
            autoFocus
            variant="contained"
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
