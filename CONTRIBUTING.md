# Git Workflow

## Working locally
- Team members work on their own forks, and make branches from dev with features they are working on.
- Only one team member at a time can be working on their feature branch.

## Testing
- The author of a feature will not be responsible for writing tests for that feature. Instead, tests will be written by another person and pushed to the /test directory on upstream dev in advance of work on the feature.
- Once a team member is ready to work on the feature, they will pull down from upstream dev to acquire the test(s).
- Coordinate questions/concerns about the test suite using GitHub Issues.

## Submitting a PR
- First, rebase on your local branch to tidy up commit history as needed.
- Pull down from upstream dev to make sure your local dev environment has the latest work.
- Once you have ensured that all tests pass, push your local feature branch (or perform a rebase) up to origin.
- Submit a PR from origin's feature branch into upstream's dev.
- Text of PR will be written in active voice (e.g. "Adds verification testing")

## Merging feature branches to dev
- When all of the tests pulled down from upstream dev are passing on your branch, you can merge changes (or submit a PR) onto dev.
- Team members should check in with each other before doing a merge; pull requests should be accepted by the person who submitted it, except under special circumstances.

## Merging dev branch to master (these will be PRs)
- Merge dev to master when we have an MVP, after our merges to dev from our separate feature branches have gone through and there are no merge conflicts or anything on dev.
- There must be a review / discussion between team members before the merge goes through to master--all code on master is production code.

## Using GitHub Issues
- Issues will be used to label bugs/problems that team members encounter when they aren't together. (presumably that are not directly related to the current feature branch, but that the other team member might know how to solve).
- Issues may also be used to suggest new features/extensions.
