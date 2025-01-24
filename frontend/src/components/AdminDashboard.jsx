import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import API from "../api/api";
import { Modal, Button, Form } from 'react-bootstrap';
import Loader from './Loader';

const AdminDashboard = ({ activeUsers }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    role: '',
    clickCount: 0,
  });

  const [role, setRole] = useState(sessionStorage.getItem('role') || 'player');

  const socket = io("https://counter-backend-slw6.onrender.com", {
    transports: ["websocket"],
  });

   const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);
  

  const fetchUsers = async () => {
    try {
      const response = await API.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      username: user.username,
      role: user.role,
      clickCount: user.clickCount,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await API.put(`/admin/users/${editingUser._id}`, editForm);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleBlock = async (user) => {
    try {
      await API.patch(`/admin/users/${user._id}/toggle-blocked`);
      fetchUsers();
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    socket.on("updateRanking", (updatedPlayer) => {
      setUsers((prev) =>
        prev.map((player) =>
          player._id === updatedPlayer.userId
            ? { ...player, bananaCount: updatedPlayer.bananaCount }
            : player
        )
      );
    });

    return () => {
      socket.off("updateRanking");
    };
  }, [socket]);

  if (isLoading) {
    return <Loader />; 
  }

  return (
    <>
      {role === 'admin' ? (
        <div style={{marginTop: '8%',}}>
          <h2 style={{ marginTop: '5%' }}>Admin Dashboard</h2>
          <h3>Active Users</h3>
          <ul>
            {activeUsers.length > 0 ? (
              activeUsers.map((user, index) => (
                <li key={index}>{user.username}</li>
              ))
            ) : (
              <p>No active users</p>
            )}
          </ul>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Click Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.clickCount}</td>
                  <td style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                    <Button
                      variant={user.blocked ? 'success' : 'warning'}
                      onClick={() => handleToggleBlock(user)}
                    >
                      {user.blocked ? 'Unblock' : 'Block'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={editingUser !== null} onHide={() => setEditingUser(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                  />
                </Form.Group>
                <Form.Group controlId="formRole">
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                  >
                    <option value="player">Player</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formClickCount">
                  <Form.Label>Click Count:</Form.Label>
                  <Form.Control
                    type="number"
                    name="clickCount"
                    value={editForm.clickCount}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div
          style={{
            width: '40%',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10% auto',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          <h4>You don't have access to view this page</h4>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
