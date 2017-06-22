# Github Workflow

- Team members will work on their own forks.
- There will be a dev branch from which feature branches will be cut.
- We will follow standard PR guidelines.
  - When you are ready to submit a PR, do an interactive rebase on your branch to clean up your commit history as needed.
  - Checkout dev and pull down from upstream to make sure your local dev has the latest work.
  - Checkout your feature branch again and rebase it onto the now-up-to-date dev.
  - Push your feature branch up to origin.
  - Submit a PR from origin's feature branch into upstream's dev.
- Check in with other team member before making a merge on dev branch.
- All merges must pass dev branch tests. (not including es-lint, etc.)
- Both team members must agree on dev to master merge. (ready to deploy MVP)
- Issues will be used to label bugs/problems and goals to be completed by all team members when they aren't together.
