import * as React from 'react';
import * as classes from './vote-options.styles';
import { TShirtVotes } from 'core';
import { Button } from '@material-ui/core';
import { cx } from 'emotion';

interface Props {
  onVoteChosen: (vote: string) => void;
  buttonFinishVoting?: JSX.Element;
  activeLabel: (event: React.MouseEvent) => void;
  votedStatus: boolean;
}

export const VoteOptionsComponent: React.FC<Props> = props => {
  const { onVoteChosen, activeLabel, votedStatus, buttonFinishVoting } = props;
  const [voteChosen, setVoteChosen] = React.useState('');
  const [voteActive, setVoteActive] = React.useState('');

  const [voteCollection, setVoteCollection] = React.useState<string[]>([
    TShirtVotes.XXL,
    TShirtVotes.XL,
    TShirtVotes.L,
    TShirtVotes.M,
    TShirtVotes.S,
    TShirtVotes.XS,
  ]);

  const onLocalVoteChosen = (vote: string) => {
    setVoteCollection([vote]);
    onVoteChosen(vote);
  };

  const cardCenterOnVoteChosen = () =>
    voteCollection.length === 1 ? classes.contanierLabelShowVote : '';

  return (
    <div className={classes.container}>
      {votedStatus ? null : (
        <h3 className={'subtitle'}>Select and send vote</h3>
      )}

      {votedStatus ? (
        <h3 className={'subtitle subtitle2'}>
          Your vote: <span className={'subtitle2'}>{voteChosen}</span>
        </h3>
      ) : null}

      <div className={cx(classes.contanierLabels, cardCenterOnVoteChosen())}>
        {voteCollection.map(vote => (
          <CardComponent
            userHasVoted={votedStatus}
            key={vote}
            cardValue={vote}
            onActivelabel={activeLabel}
            onVoteSelected={setVoteActive}
            voteSelected={voteActive}
          />
        ))}
      </div>
      <div className={'button-container'}>
        {votedStatus ? (
          undefined
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={e =>
              voteChosen !== ''
                ? onLocalVoteChosen(voteChosen)
                : alert('Select label')
            }
            className={'button'}
          >
            send vote
          </Button>
        )}
        {buttonFinishVoting}
      </div>
    </div>
  );
};

interface CardProps {
  cardValue: string;
  voteSelected: string;
  userHasVoted: boolean;
  onVoteSelected: (value: string) => void;
  // TODO: check if we can remove it
  onActivelabel: (e) => void;
}

const CardComponent: React.FC<CardProps> = props => {
  const {
    onVoteSelected,
    onActivelabel,
    cardValue,
    userHasVoted,
    voteSelected,
  } = props;

  const styleVotedCard = () => (userHasVoted ? classes.showLabelVote : '');

  const styleActiveCard = () => {
    return voteSelected !== cardValue ? classes.label : classes.activeLabel;
  };

  return (
    <div
      className={cx(styleActiveCard(), styleVotedCard())}
      onClick={event => {
        onVoteSelected(cardValue);
        onActivelabel(event);
      }}
    >
      <h1>{cardValue}</h1>
      <h2>SIZE</h2>
    </div>
  );
};
