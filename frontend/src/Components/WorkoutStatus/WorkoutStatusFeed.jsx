import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Card, CardContent, Avatar, Grid, IconButton } from '@mui/material';
import { Delete, Edit, ArrowBack, Favorite, Chat, Send } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const WorkoutStatusFeed = () => {
    const [workoutStatusPosts, setWorkoutStatusPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editConfirmationOpen, setEditConfirmationOpen] = useState(false);
    const [postIdToEdit, setPostIdToEdit] = useState(null);
    const [editedPost, setEditedPost] = useState({
        description: '',
        distanceRun: 0,
        pushupsCompleted: 0,
        weightLifted: 0
    });
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchWorkoutStatusPosts();
    }, []);

    const fetchWorkoutStatusPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8443/api/current-workout-status');
            setWorkoutStatusPosts(response.data);
            setLoading(false);
            initializeLikesAndComments(response.data);
        } catch (error) {
            console.error('Error fetching workout status posts:', error);
            setLoading(false);
        }
    };

    const initializeLikesAndComments = (posts) => {
        const initialLikes = {};
        const initialComments = {};
        posts.forEach(post => {
            initialLikes[post.id] = 0;
            initialComments[post.id] = [];
        });
        setLikes(initialLikes);
        setComments(initialComments);
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8443/api/current-workout-status/${postId}`);
            setWorkoutStatusPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            setLikes(prevLikes => {
                const updatedLikes = { ...prevLikes };
                delete updatedLikes[postId];
                return updatedLikes;
            });
            setComments(prevComments => {
                const updatedComments = { ...prevComments };
                delete updatedComments[postId];
                return updatedComments;
            });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = (post) => {
        setPostIdToEdit(post.id);
        setEditedPost({
            description: post.description,
            distanceRun: post.distanceRun,
            pushupsCompleted: post.pushupsCompleted,
            weightLifted: post.weightLifted
        });
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setPostIdToEdit(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:8443/api/current-workout-status/${postIdToEdit}`, editedPost);
            const updatedPost = response.data;
            setWorkoutStatusPosts(prevPosts =>
                prevPosts.map(post => (post.id === postIdToEdit ? updatedPost : post))
            );
            setEditDialogOpen(false);
            setEditConfirmationOpen(true);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditConfirmationClose = () => {
        setEditConfirmationOpen(false);
    };

    const handleLike = (postId) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [postId]: prevLikes[postId] ? 0 : 1
        }));
    };

    const handleComment = async (postId) => {
        if (newComment.trim() !== '') {
            try {
                const response = await axios.post(`http://localhost:8443/api/comments`, {
                    postId: postId,
                    text: newComment,
                    user: 'Anonymous'
                });
                const newCommentData = response.data;
                setComments(prevComments => ({
                    ...prevComments,
                    [postId]: [...prevComments[postId], newCommentData]
                }));
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <div>
            <IconButton aria-label="back" onClick={() => window.history.back()}>
                {/* <ArrowBack /> */}
            </IconButton>
            <Typography variant="h4" gutterBottom>
                My Workout Status
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : workoutStatusPosts.length === 0 ? (
                <Typography variant="body1">No workout status posts found.</Typography>
            ) : (
                workoutStatusPosts.map(post => (
                    <Card key={post.id} style={{ marginBottom: '20px', position: 'relative' }}>
                        <CardContent>
                            <IconButton
                                aria-label="edit"
                                onClick={() => handleEdit(post)}
                                style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(post.id)}
                                style={{ position: 'absolute', top: '5px', right: '30px', zIndex: 1 }}
                            >
                                <Delete />
                            </IconButton>
                            <div style={{ width: '100%', height: '200px' }}>
                                <ResponsiveContainer>
                                    <BarChart
                                        data={[post]}
                                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                    >
                                        <XAxis dataKey="userId" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="distanceRun" fill="#8884d8" />
                                        <Bar dataKey="pushupsCompleted" fill="#82ca9d" />
                                        <Bar dataKey="weightLifted" fill="#ffc658" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <IconButton aria-label="like" onClick={() => handleLike(post.id)}>
                                    <Favorite color={likes[post.id] === 1 ? 'secondary' : 'action'} />
                                </IconButton>
                                <Typography variant="body2">{likes[post.id]} Like{likes[post.id] !== 1 ? 's' : ''}</Typography>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Typography variant="subtitle1">Comments</Typography>
                                {comments[post.id].map((comment, index) => (
                                    <Grid container spacing={2} alignItems="center" key={index}>
                                        <Grid item>
                                            <Avatar>{comment.user.charAt(0)}</Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2"><strong>{comment.user}</strong>: {comment.text}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            placeholder="Add a comment"
                                            value={newComment}
                                            onChange={handleNewCommentChange}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton aria-label="send" onClick={() => handleComment(post.id)}>
                                            <Send />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={editedPost.description}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Distance Run (km)"
                        name="distanceRun"
                        type="number"
                        value={editedPost.distanceRun}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Pushups Completed"
                        name="pushupsCompleted"
                        type="number"
                        value={editedPost.pushupsCompleted}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Weight Lifted (lbs)"
                        name="weightLifted"
                        type="number"
                        value={editedPost.weightLifted}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editConfirmationOpen} onClose={handleEditConfirmationClose}>
                <DialogTitle>Edit Confirmation</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Post edited successfully!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditConfirmationClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default WorkoutStatusFeed;
