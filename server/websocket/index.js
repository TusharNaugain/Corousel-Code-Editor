export function setupWebSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('code-change', ({ roomId, content }) => {
      socket.to(roomId).emit('code-update', content);
    });

    socket.on('cursor-move', ({ roomId, cursor }) => {
      socket.to(roomId).emit('cursor-update', {
        userId: socket.id,
        cursor,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}