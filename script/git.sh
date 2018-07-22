#!/bin/bash
usage="Usage: $(basename "$0") name description -- Sets up a new GitHub project"

if [ "$#" -ne 2 ]; then
    echo "$usage"
    exit 1
fi

name=$1
description=$2

# Create git project if the access token is set
if [ -n "$GITHUB_ACCESS_TOKEN" ]; then
    echo 'Creating GitHub repo...'
    curl -H "Authorization: token $GITHUB_ACCESS_TOKEN" https://api.github.com/user/repos -d "{\"name\":\"$name\",\"description\":\"$description\"}"
    git remote add origin git@github.com:Jezzamonn/$name.git
else
    echo 'No GitHub personal access token exists, skipping creating a GitHub repo.'
fi