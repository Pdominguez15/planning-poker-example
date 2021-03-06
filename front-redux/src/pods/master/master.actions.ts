import { ConnectionSetup, SocketOuputMessageTypes, ActionBase } from 'core';

const prefix = '[MASTER_POD]';

export const podMasterActionIds = {
  CONNECT_MASTER: `${prefix}[0] MASTER CONNECTS TO SOCKET.`,
  DISCONNECT_MASTER: `${prefix}[1] Disconnect socket`,
  SEND_MESSAGE_MASTER: `${prefix}[2] Master player sends a message to the server`,
  MASTER_VOTED: `${prefix}[3] Master Voted`,
};

export const ConnectMasterAction = (
  connectionSetup: ConnectionSetup
): ActionBase => ({
  type: podMasterActionIds.CONNECT_MASTER,
  payload: connectionSetup,
});

export const SendCreateStoryMessageToServerAction = (title): ActionBase => ({
  type: podMasterActionIds.SEND_MESSAGE_MASTER,
  payload: { type: SocketOuputMessageTypes.CREATE_STORY, payload: title },
});

export const voteTimeIsOverAction = (): ActionBase => ({
  type: podMasterActionIds.SEND_MESSAGE_MASTER,
  payload: { type: SocketOuputMessageTypes.END_VOTE_TIME },
});

export const masterVotesAction = (vote: string): ActionBase => ({
  type: podMasterActionIds.SEND_MESSAGE_MASTER,
  payload: { type: SocketOuputMessageTypes.USER_VOTED, payload: vote },
});

export const masterVotedAction = (): ActionBase => ({
  type: podMasterActionIds.MASTER_VOTED,
  payload: null,
});
