import { UserSession, ConnectSessionInfo, VotesFromRooms } from 'dals/user';

export interface StorageAPI {
  isRoomAvailable: (room: string) => Promise<Boolean>;
  addNewUser: (
    connectionId: string,
    connectSession: ConnectSessionInfo
  ) => Promise<UserSession | void>;
  isMasterUser: (connectionId: string) => Promise<UserSession>;
  isNicknameInUse: (nickname: string, room: string) => Promise<Boolean>;
  getRoomFromConnectionId: (connectionId: string) => Promise<string>;
  getNicknameFromConnectionId: (connectionId: string) => Promise<string>;
  resetVotes: (room: string) => Promise<void>;
  vote: (connectionId: string, value: string) => Promise<void>;
  getVotesFromRoom: (room: string) => Promise<VotesFromRooms[]>;
  freeRoom: (room: string) => Promise<UserSession[] | void>;
}
