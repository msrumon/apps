# Apps

This repository is a collection of all the apps from [this](https://github.com/florinpop17/app-ideas) repository that I have built by myself.

## How To Run

The best way is to use [`docker compose up <folder-name>`](https://docs.docker.com/reference/cli/docker/compose/up/) command. For example, if you want to run the first app, you need to run the following command:

```bash
docker compose up 1-beginner-bin2dec-1001
```

The 4-digits number at the end of each folder's name represents the port number the app is running on. In the above case, you should be able to see the app by visiting <http://localhost:1001>.

> When you're done, run [`docker compose down --rmi local`](https://docs.docker.com/reference/cli/docker/compose/down/) command.

Alternatively, you can navigate into each folder and run `npm run dev` (followed by `npm i`) to view each app. In that case, follow the terminal to get the URL of the currently-running app.
