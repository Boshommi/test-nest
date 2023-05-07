import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class UsersGateway {
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): string {
    client.emit('message', 'asdasd');
    return 'Hello world!';
  }
}
