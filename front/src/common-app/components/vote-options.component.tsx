import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import * as classes from './vote-options.styles';
import { TShirtVotes } from 'core';
import { Button } from '@material-ui/core';
import { cx } from 'emotion';
import { useSnackbarContext, SnackbarComponent } from 'common';

interface Props {
  onVoteChosen: (vote: string) => void;
  buttonFinishVoting?: React.FC;
  votedStatus: boolean;
}

export const VoteOptionsComponent: React.FC<Props> = props => {
  const { onVoteChosen, votedStatus, buttonFinishVoting } = props;
  const [voteChosen, setVoteChosen] = React.useState('');
  const [voteActive, setVoteActive] = React.useState('');

  // https://stackoverflow.com/questions/16174182/typescript-looping-through-a-dictionary
  const [voteCollection, setVoteCollection] = React.useState<string[]>(
    Object.keys(TShirtVotes).map(k => TShirtVotes[k])
  );

  const { showMessage } = useSnackbarContext();

  const onLocalVoteChosen = voteActive => {
    setVoteCollection([voteActive]);
    onVoteChosen(voteActive);
  };

  const cardCenterOnVoteChosen = () =>
    voteCollection.length === 1 ? classes.contanierLabelShowVote : '';

  return (
    <div className={classes.container}>
      <SnackbarComponent />
      {votedStatus ? null : (
        <Typography
          variant="h3"
          component="h2"
          id="T-shirt size votes"
          className={classes.subtitle}
        >
          Select and send vote
        </Typography>
      )}

      {votedStatus ? (
        <Typography
          variant="h3"
          component="h2"
          className={cx(classes.subtitle, classes.subtitle2)}
        >
          Your vote: <span className={classes.subtitle2}>{voteChosen}</span>
        </Typography>
      ) : null}
      <div role="radiogroup" aria-labelledby="T-shirt size votes">
        <ul className={cx(classes.contanierLabels, cardCenterOnVoteChosen())}>
          {/* TODO - CHECK IF RECEIVED NULL OR UNDEFINED */}
          {voteCollection.map(vote => (
            <CardComponent
              userHasVoted={votedStatus}
              key={vote}
              cardValue={vote}
              onVoteSelected={setVoteActive}
              voteSelected={voteActive}
            />
          ))}
        </ul>
      </div>
      <div className={classes.buttonContainer}>
        {votedStatus ? (
          undefined
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={e =>
              voteActive !== ''
                ? onLocalVoteChosen(voteActive)
                : showMessage('Select label', 'error')
            }
            className={classes.button}
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
}

const CardComponent: React.FC<CardProps> = props => {
  const { onVoteSelected, cardValue, userHasVoted, voteSelected } = props;

  const styleVotedCard = () => (userHasVoted ? classes.showLabelVote : '');

  const styleActiveCard = () => {
    return voteSelected !== cardValue ? classes.label : classes.activeLabel;
  };

  return (
    <li className={classes.voteListItem(voteSelected === cardValue)}>
      <input
        className={classes.radioButton}
        type="radio"
        id={`${cardValue} size`}
        name="T-shirt size votes"
        onClick={event => {
          onVoteSelected(cardValue);
        }}
        data-testid={cardValue}
      />
      <label htmlFor={`${cardValue} size`}>
        <div className={cx(styleActiveCard(), styleVotedCard())}>
          <div>{cardValue}</div>
          <span>SIZE</span>
        </div>
      </label>
    </li>
  );
};
