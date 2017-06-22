# Github Workflow

## Working locally
- Team members work on their own forks, and make branches from dev with features they are working on. 
- Only one team member at a time can be working on their feature branch.
 
## Merging feature branches to dev (these do not have to be PRs, unless we are working remotely)
- When the tests pulled down from dev are passing on your branch, you can merge changes (or submit a PR) onto dev.
- In order to merge a feature into dev, it must pass all of the tests on dev. 
- Team members should check in with each other before doing a merge.
 
## Merging dev branch to master (these will be PRs)
- Merge dev to master when we have an MVP, after our merges to dev from our separate feature branches have gone through and there are no merge conflicts or anything on dev. 
- There must be a review / discussion between team members before the merge goes through to master.
 
## Submitting a PR
- First, rebase on your branch to clean up your commit history as needed.
- Checkout dev and pull down from upstream to make sure your local dev has the latest work.
- Checkout feature branch again, make sure the tests all pass, then rebase it onto the now-up-to-date dev.
- Push feature branch up to origin.
- Submit a PR from origin's feature branch into upstream's dev (or master).
 
## Using GitHub Issues
- Issues will be used to label bugs/problems that team members encounter when they aren't together. (presumably that are not directly related to the current feature branch, but that the other team member might know how to solve).
