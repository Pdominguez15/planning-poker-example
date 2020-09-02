import * as React from 'react';
import * as classes from './master.component.styles';
import { appBaseUrl } from 'core';
import { Player, MasterStatus, VoteResult } from './master.vm';
import { TablePlayerComponent } from 'pods/table-player/table-player.component';
import { CopySessionLinkComponent } from './components/copy-session-link.component';
import { DefineStoryComponent } from './components';
// TODO: Move this to common-app
import { VoteOptionsContainer } from 'pods/vote-options';
import { PlayerVotingStatus } from 'core';
import { Button, Divider } from '@material-ui/core';

interface Props {
  room: string;
  playerCollection: Player[];
  onSetStoryTitle: (title: string) => void;
  masterStatus: MasterStatus;
  onFinishVoting: () => void;
  onMoveToNextStory: () => void;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
  voteCollectionResult: VoteResult[];
  title: string;
}

export const MasterComponent: React.FC<Props> = props => {
  const [playerVotingStatus, setPlayerVotingStatus] = React.useState<
    PlayerVotingStatus[]
  >([]);

  const {
    room,
    playerCollection,
    onSetStoryTitle,
    masterStatus,
    onFinishVoting,
    onMoveToNextStory,
    onMasterVoteChosen,
    masterVoted,
    voteCollectionResult,
    title,
  } = props;

  React.useEffect(() => {
    const statusCollection: PlayerVotingStatus[] = playerCollection.map(
      player => {
        const playerVoteItem = voteCollectionResult.find(
          v => v.nickname === player.nickname
        );

        return {
          ...player,
          vote: playerVoteItem ? playerVoteItem.vote : '',
        };
      }
    );

    setPlayerVotingStatus(statusCollection);
  }, [playerCollection, voteCollectionResult]);

  const bottonFinishVoting: JSX.Element = (
    <Button
      variant="contained"
      color="secondary"
      onClick={e => onFinishVoting()}
      className={'bottom'}
    >
      Finish Voting
    </Button>
  );

  const showComponentBasedOnMasterStatus = (status: MasterStatus) => {
    switch (status) {
      case MasterStatus.INITIALIZING:
        return null;
      case MasterStatus.CREATING_STORY:
        return (
          <>
            <DefineStoryComponent onSubmit={onSetStoryTitle} />
            {room ? (
              <TablePlayerComponent playersCollection={playerVotingStatus} />
            ) : null}
          </>
        );
      case MasterStatus.VOTING_IN_PROGRESS:
        return (
          <>
            <div className={'container-component'}>
              <TablePlayerComponent playersCollection={playerVotingStatus} />
            </div>
            <div className={'container-component'}>
              {title ? <h3 className={'subtitle'}>Story:</h3> : null}
              {title ? <p className={'story'}>{title}</p> : null}
            </div>
            <div className={'container-component'}>
              <VoteOptionsContainer
                bottonFinishVoting={bottonFinishVoting}
                onVoteChosen={onMasterVoteChosen}
                votedStatus={masterVoted}
              />
            </div>
          </>
        );
      case MasterStatus.SHOWING_RESULTS:
        return (
          <>
            <span>Show Voting results</span>
            <TablePlayerComponent playersCollection={playerVotingStatus} />
            <Button
              variant="contained"
              color="primary"
              onClick={onMoveToNextStory}
            >
              Move to next story
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={'left-container'}>
          <CopySessionLinkComponent url={`${appBaseUrl}/#/player/${room}`} />
          <div className={classes.component}>
            {showComponentBasedOnMasterStatus(masterStatus)}
          </div>
        </div>
      </div>
    </>
  );
};
