# good-call

Ok, I need a component to run that says Hello and listens for an auth change.
It then starts the signInCall.
  If that call errors, boo
  otherwise, wait for success (known through listener)
    then check that reps are stored
      if they are, screen that says "Your reps are BLAH"
    else
      if they are not, show FindYourReps
