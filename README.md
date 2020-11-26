# jira_api
Sample application for Jira excepted to run on macOS or Linux.

# Setup

```bash
git clone https://github.com/taserbeat/jira_api.git
cd jira_api
```

```bash
pip install pipenv
pipenv sync --dev
```

```bash
bash generate_secretkey.sh 
```

# Run

```bash
pipenv run server
```