#!/bin/sh
cd `dirname $0`
source .venv/bin/activate
cd ./jira_api
python generate_secretkey_setting.py > local_settings.py
echo "secret key is generated!"
cd ..
deactivate