import { useEffect, useState } from "react";
import { getUsers } from "../service/UserService";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách người dùng");
        setLoading(false);
      });
  }, []);

  // Loading
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div style={{ width: "400px", margin: "50px auto" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  // Success
  return (
    <Card style={{ width: "500px", margin: "50px auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Danh sách người dùng
        </Typography>

        <List>
          {users.map((user) => (
            <ListItem key={user.id} divider>
              <ListItemText
                primary={user.name}
                secondary={`${user.email} | ${user.phone}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default UserList;

