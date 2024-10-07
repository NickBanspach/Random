
import { ModalDialog, DialogTitle, FormControl, FormLabel, Button, Modal, Stack, Input } from "@mui/joy";
import { type ReactNode, type ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

const AdminModal = ({ children }: { children: ReactNode }): ReactElement => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {isPasswordCorrect ? (
        children
      ) : (
        <Modal open={!isPasswordCorrect}>
          <ModalDialog>
            <DialogTitle>Get Admin Access</DialogTitle>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                if ((await socket.emitWithAck("verifyPassword", password)) as boolean) {
                  setIsPasswordCorrect(true);
                } else navigate("/");
                setPassword("");
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    autoFocus
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    required
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      )}
    </>
  );
};

export default AdminModal;
