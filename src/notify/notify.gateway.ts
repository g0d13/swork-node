import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotifyService } from './notify.service';
import { AddConnectionDto } from './dto/create-connection.dto';

@WebSocketGateway()
export class NotifyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;

  constructor(private readonly notifyService: NotifyService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('events', data);
    return data;
  }

  async handleDisconnect(client: Socket) {
    await this.notifyService.removeConnection(client.id);
  }

  async sendNotifyToMechanic(userId: string, content) {
    console.log(`Sending notification to ${userId} with content ${content}`);
    const connections = await this.notifyService.findUserConnections(userId);
    connections.forEach((cn) => {
      this.server
        .to(cn.connectionId)
        .emit(
          'notify',
          'Nueva notificacion pendiente, abrela para mas informacion',
        );
    });
  }

  handleConnection(client: Socket, data: any) {
    const id = client.handshake.query.id;
    const connection: AddConnectionDto = {
      userId: id,
      connectionId: client.id,
    };
    this.notifyService.addConnection(connection);
  }

  afterInit(server: any): any {
    this.notifyService.removeAllConnections();
  }
}
