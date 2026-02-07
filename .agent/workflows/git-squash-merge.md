---
description: Squash merges a specified branch into the current branch.
---

Steps:

1. Verify the current branch and ensure the working tree is clean
2. Squash merge the specified branch into the current branch with `git merge --squash <branch>`
3. Commit with a message following conventional commits: `feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`, `test:`, `perf:`, `build:`, `ci:`, `revert:`
4. Push the changes to remote with `git push`
5. Ask the user if he wants to delete the local and remote branch of the merged
6. If yes, Delete the merged branch locally with `git branch -d <branch>`
7. Else, Abort and complete the flow.