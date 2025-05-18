import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, error, isError } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((member) => member !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { chatId, members: selectedMembers });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack spacing={"1rem"} padding={"1rem"} width={"23rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((user) => (
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
            disabled={isLoadingAddMembers}
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
